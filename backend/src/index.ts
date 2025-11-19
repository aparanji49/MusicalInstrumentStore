import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import productsRouter from './routes/products.js';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from "express-session";
import musebotRouter from './routes/musebot.js';
// GraphQL imports
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from  '@as-integrations/express4';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import { typeDefs } from './graphql/schema.js';
import { resolvers } from './graphql/resolvers.js';
import Stripe from "stripe";
import rateLimit, { ipKeyGenerator } from 'express-rate-limit';
const app = express();

app.use(cors({ origin: ['http://localhost:5173'], credentials: true, }));
app.use(express.json());

// --- Session cookie (dev-friendly) ---
app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev-secret-change-me",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // set true behind HTTPS/proxy in prod
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  })
);

// --- Stripe setup ---
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
// Endpoint to create PaymentIntent and send client secret to frontend
app.get('/secret', async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
  amount: 1099,
  currency: 'usd',
  automatic_payment_methods: {
    enabled: true,
  },
});
  res.json({client_secret: paymentIntent.client_secret});
});

// --- Passport setup --- Google OAuth 2.0
app.use(passport.initialize());
app.use(passport.session());

// Minimal in-memory user store (swap with DB)
type User = { id: string; email?: string | null };
const users = new Map<string, User>();

passport.serializeUser((user: any, done) => {
  done(null, user.id); // store just user id in session
});

passport.deserializeUser((id: string, done) => {
  const user = users.get(id) || null;
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!, // e.g. http://localhost:4000/auth/google/callback
    },
    async (_accessToken, _refreshToken, profile, done) => {
      const id = profile.id;
      const email = profile.emails?.[0]?.value ?? null;
      let user = users.get(id);
      if (!user) {
        user = { id, email };
        users.set(id, user);
      }
      return done(null, user);
    }
  )
);

app.use(morgan('dev'));

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/products', productsRouter);

const musebotLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 6,                   // 6 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error:
      "Too many MuseBot requests. Please wait a few minutes and try again.",
  },
  keyGenerator: (req, _res) => {
    // Use email if logged in
    const user = (req as any).user as { email?: string | null } | undefined;
    if (user?.email) {
      return `email:${user.email}`;
    }

    // Fallback to IP — IMPORTANT: use ipKeyGenerator on req.ip
     const ip = req.ip ?? "0.0.0.0"; // fallback so TS is happy
    return `ip:${ipKeyGenerator(ip)}`;
  },
});



// OpenAI setup (example usage in resolvers)
app.use('/api/musebot', musebotLimiter, musebotRouter);



// Start Google OAuth
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: true }),
  (req, res) => {
    // After login, send user back to SPA
    const redirect = process.env.APP_POST_LOGIN_REDIRECT || (process.env.APP_ORIGIN || "http://localhost:5173");
    res.redirect(redirect + "/profile");
  }
);

// Current user
app.get("/api/me", (req, res) => {
  if (req.isAuthenticated?.() && req.user) {
    return res.json(req.user);
  }
  res.status(204).end(); // no content if not logged in
});

// Logout
app.post("/auth/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.status(204).end();
    });
  });
});


const MONGO_URI = process.env.MONGO_URI!;
const PORT = Number(process.env.PORT ?? 4000);

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Mongo connected');// 🚀 Start Apollo
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [ApolloServerPluginLandingPageLocalDefault()], // GraphQL Sandbox at /graphql in dev
    });
    await server.start();
    app.use('/graphql', express.json(), expressMiddleware(server));

    app.listen(PORT, () => console.log(`✅ API http://localhost:${PORT}  |  GraphQL http://localhost:${PORT}/graphql`));
  } catch (e) {
    console.error('❌ Mongo connect failed', e);
    process.exit(1);
  }
})();
