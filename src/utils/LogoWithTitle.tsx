import Logo from "@/assets/icons/Logo";
import { Link } from "react-router";

export default function LogoWithTitle() {
  return (
    <Link
      to="/"
      className="absolute top-4 left-4 flex items-center gap-1 text-primary hover:text-primary/90"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <Logo />
      <h1 className="font-bold lg:text-xl text-blue-400">
        Tour<span className="text-primary ml-1">Matrix</span>
      </h1>
    </Link>
  );
}
