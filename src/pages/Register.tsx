import RegisterForm from "@/components/modules/Authentication/RegisterForm";
import LogoWithTitle from "@/utils/LogoWithTitle";

export default function Register() {
  return (
    <div className="min-h-svh flex flex-col items-center justify-center">
      <LogoWithTitle />
      <div className="p-6 rounded-lg shadow-md w-full max-w-sm md:max-w-3xl">
        <RegisterForm />
      </div>
    </div>
  );
}
