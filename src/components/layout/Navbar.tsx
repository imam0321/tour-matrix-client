import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ModeToggle } from "./mode.toggle";
import { Link } from "react-router";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { role } from "@/constants/role";
import LogoutButton from "../modules/Buttons/LogoutButton";

const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/tours", label: "Tours", role: "PUBLIC" },
  { href: "/reviews", label: "Reviews", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/admin", label: "Dashboard", role: role.superAdmin },
  { href: "/admin", label: "Dashboard", role: role.admin },
  { href: "/user", label: "Dashboard", role: role.user },
];

export default function Navbar() {
  const { data, isLoading } = useUserInfoQuery(undefined);

  return (
    <header className="border-b px-4 md:px-6 sticky top-0 z-50 glass-effect">
      <div className="flex items-center justify-between gap-4 h-16">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link) => {
                    if (link.role === "PUBLIC" || link.role === data?.role) {
                      return (
                        <NavigationMenuItem key={link.href} className="w-full">
                          <NavigationMenuLink asChild className="py-1.5">
                            <Link
                              to={link.href}
                              onClick={() =>
                                window.scrollTo({ top: 0, behavior: "smooth" })
                              }
                            >
                              {link.label}
                            </Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      );
                    }
                    return null;
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-1 text-primary hover:text-primary/90"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <Logo />
              <h1 className="font-bold lg:text-xl hidden md:inline-flex">
                <span className="text-[#1C97E3]">Tour</span>
                <span className="text-[#ff2056] ml-1">Matrix</span>
              </h1>
            </Link>

            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden mt-1">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link) => {
                  if (link.role === "PUBLIC" || link.role === data?.role) {
                    return (
                      <NavigationMenuItem key={link.href}>
                        <NavigationMenuLink
                          asChild
                          className="text-muted-foreground hover:text-primary py-2 font-medium"
                        >
                          <Link
                            to={link.href}
                            onClick={() =>
                              window.scrollTo({ top: 0, behavior: "smooth" })
                            }
                          >
                            {link.label}
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    );
                  }
                  return null;
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          {isLoading && (
            <div className="w-5 h-5 border-2 border-gray-300 border-t-primary rounded-full animate-spin"></div>
          )}
          {!isLoading && data?.email && <LogoutButton />}
          {!isLoading && !data?.email && (
            <Button asChild className="text-sm rounded-2xl">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
