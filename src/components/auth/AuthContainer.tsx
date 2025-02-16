import { useState } from "react";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";

type AuthFormType = "login" | "signup";

export function AuthContainer() {
  const [authType, setAuthType] = useState<AuthFormType>("login");

  return (
    <div>
      <div>
        <button
          onClick={() => setAuthType("login")}
          className={authType === "login" ? "active" : ""}
        >
          Login
        </button>
        <button
          onClick={() => setAuthType("signup")}
          className={authType === "signup" ? "active" : ""}
        >
          Sign Up
        </button>
      </div>

      {authType === "login" ? <LoginForm /> : <SignupForm />}
    </div>
  );
}
