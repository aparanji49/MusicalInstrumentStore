import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../lib/config";
import GoogleButton from 'react-google-signin-button';
import 'react-google-signin-button/dist/button.css';

export default function Login() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check session
    fetch(`${API_BASE}/api/me`, { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((me) => {
        if (me) navigate("/profile", { replace: true });
      })
      .finally(() => setChecking(false));
  }, [navigate]);

//   const label = "Sign in with Google";
  const handleClick = () => {
    // Start OAuth flow on your backend
    window.location.href = `${API_BASE}/auth/google`;
  };

  if (checking) return null; // or a spinner
    return (

    <div className="bordered rounded-lg max-w-md mx-auto mt-20 shadow-lg flex flex-col justify-center items-center border border-gray-300">
      <div className="mx-auto max-w-6xl px-4 py-10 text-white text-center text-3xl text-extrabold">
        Login
      </div>

      <div className="mx-auto max-w-md p-6 flex justify-center items-center mb-6">
        <GoogleButton
          onClick={handleClick}
          logoAlign="center" />
        {/* //   className="g_id_signin" */}
        {/* //   className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 bg-white hover:bg-gray-50 active:scale-[.98] focus:ring-2 focus:ring-gray-200" */}
        {/* //   aria-label={label} */}
        
          {/* <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path
              fill="#EA4335"
              d="M12 10.2v3.9h5.5c-.2 1.2-1.7 3.6-5.5 3.6-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.2.8 3.9 1.5l2.6-2.5C16.9 3.1 14.7 2 12 2 6.9 2 2.7 6.2 2.7 11.3S6.9 20.7 12 20.7c6.9 0 9.2-4.8 9.2-7.2 0-.5 0-.8-.1-1.2H12z"
            />
          </svg> */}
          {/* {label} */}
        {/* </button> */}
      </div>
    </div>
  ) 
};