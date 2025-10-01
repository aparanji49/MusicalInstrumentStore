import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import productsRouter from './src/routes/products.ts';
// GraphQL imports
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from  '@as-integrations/express4';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import bodyParser from 'body-parser';
import { typeDefs } from './src/graphql/schema.ts';
import { resolvers } from './src/graphql/resolvers.js';
const app = express();
app.use(cors({ origin: ['http://localhost:5173'] }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/products', productsRouter);

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
    app.use('/graphql', bodyParser.json(), expressMiddleware(server));

    app.listen(PORT, () => console.log(`✅ API http://localhost:${PORT}  |  GraphQL http://localhost:${PORT}/graphql`));
  } catch (e) {
    console.error('❌ Mongo connect failed', e);
    process.exit(1);
  }
})();
