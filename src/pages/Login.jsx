import { useState } from "react";
import { supabase } from "../supabaseClient";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("Supabase data:", data);
    console.log("Supabase error:", error);

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] px-4 text-[#172033]">
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-[420px]">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#172033] text-lg font-bold text-white">
              K
            </div>

            <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>

            <p className="mt-2 text-sm text-[#7b8494]">
              Sign in to manage your tasks
            </p>
          </div>

          <div className="rounded-2xl border border-[#e5e8ed] bg-white p-7 shadow-[0_8px_30px_rgba(23,32,51,0.06)]">
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#30394a]">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 w-full rounded-lg border border-[#dfe3e8] bg-white px-3.5 text-sm text-[#172033] outline-none transition placeholder:text-[#a1a8b3] focus:border-[#172033] focus:ring-2 focus:ring-[#172033]/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#30394a]">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 w-full rounded-lg border border-[#dfe3e8] bg-white px-3.5 text-sm text-[#172033] outline-none transition placeholder:text-[#a1a8b3] focus:border-[#172033] focus:ring-2 focus:ring-[#172033]/10"
                />
              </div>

              <button
                type="submit"
                className="h-11 w-full rounded-lg bg-[#172033] text-sm font-semibold text-white transition hover:bg-[#253047]"
              >
                Login
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#e8ebef]" />
              <span className="text-xs text-[#9aa1ac]">OR</span>
              <div className="h-px flex-1 bg-[#e8ebef]" />
            </div>

            <p className="text-center text-sm text-[#7b8494]">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-[#172033] hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-[#9aa1ac]">
            Keep your team's work organized in one place.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
