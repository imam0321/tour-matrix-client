import LoginForm from "@/components/modules/Authentication/LoginForm";
import LogoWithTitle from "@/utils/LogoWithTitle";

export default function Login() {
  return (
    <div className="h-screen flex flex-col items-center justify-center p-4">
      <LogoWithTitle />
      <div className="mt-4 p-0 rounded-lg shadow-md w-full max-w-sm md:max-w-3xl overflow-hidden">
        <LoginForm />
      </div>
    </div>
  );
}
