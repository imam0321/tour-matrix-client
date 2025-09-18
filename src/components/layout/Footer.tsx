import Dribble from "@/assets/icons/Dribble";
import Facebook from "@/assets/icons/Facebook";
import GitHub from "@/assets/icons/GitHub";
import Instagram from "@/assets/icons/Instagram";
import Logo from "@/assets/icons/Logo";
import Twitter from "@/assets/icons/Twitter";
import { role } from "@/constants/role";
import { Link } from "react-router";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/tours", label: "Tours", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/admin", label: "Dashboard", role: role.superAdmin },
  { href: "/admin", label: "Dashboard", role: role.admin },
  { href: "/user", label: "Dashboard", role: role.user },
];

export default function Footer() {
  const { data: userData } = useUserInfoQuery(undefined);

  // Determine current role
  const currentRole = userData?.role ?? "PUBLIC";

  // Filter links based on role
  const filteredLinks = navigationLinks.filter(
    (link) => link.role === "PUBLIC" || link.role === currentRole
  );

  return (
    <footer className="text-accent-foreground border-t-2 border-sidebar-border">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex justify-center items-center gap-2">
          <Logo />
          <p className="font-bold text-2xl sm:text-3xl text-blue-400">
            Tour<span className="text-primary ml-1 sm:ml-2">Matrix</span>
          </p>
        </Link>

        {/* Description */}
        <p className="mx-auto mt-4 sm:mt-6 max-w-md text-center text-sm sm:text-base leading-relaxed text-accent-foreground">
          Discover unforgettable journeys with Tour Matrix – your gateway to
          adventure and comfort.
        </p>

        {/* Navigation Links */}
        <ul className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          {filteredLinks.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-accent-foreground transition hover:font-medium hover:text-primary"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Social Icons */}
        <ul className="mt-4 sm:mt-6 flex justify-center gap-4 sm:gap-6 md:gap-8">
          {[Facebook, Instagram, Twitter, GitHub, Dribble].map((Icon, i) => (
            <li key={i}>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="text-accent-foreground transition hover:text-blue-400"
              >
                <Icon />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
