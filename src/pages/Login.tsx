import Logo from "@/assets/icons/Logo";
import LoginForm from "@/components/modules/Authentication/LoginForm";
import { Link } from "react-router";

export default function Login() {
  return (
    <div className="min-h-svh flex flex-col items-center justify-center">
      <Link
        to="/"
        className="absolute top-4 left-4 flex items-center gap-1 text-primary hover:text-primary/90"
      >
        <Logo />
        <h1 className="font-bold lg:text-xl text-blue-400">
          Tour<span className="text-primary ml-1">Matrix</span>
        </h1>
      </Link>
      <div className="p-6 rounded-lg shadow-md w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
}
