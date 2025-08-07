import Dribble from "@/assets/icons/Dribble";
import Facebook from "@/assets/icons/Facebook";
import GitHub from "@/assets/icons/GitHub";
import Instagram from "@/assets/icons/Instagram";
import Logo from "@/assets/icons/Logo";
import Twitter from "@/assets/icons/Twitter";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="dark:bg-neutral-900 text-accent-foreground border border-sidebar-border border-t-2">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <Link to="/">
          <div className="flex justify-center items-center gap-2">
            <Logo />
            <p className="font-bold text-3xl text-blue-400">
              Tour<span className="text-primary ml-2">Matrix</span>
            </p>
          </div>
        </Link>

        <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-accent-foreground">
          Discover unforgettable journeys with Tour Matrix – your gateway to
          adventure and comfort.
        </p>

        <ul className="mt-6 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
          {["Home", "About", "History", "Services", "Projects", "Blog"].map(
            (item) => (
              <li key={item}>
                <Link
                  to="#"
                  className="text-accent-foreground transition hover:font-medium hover:text-primary"
                >
                  {item}
                </Link>
              </li>
            )
          )}
        </ul>

        <ul className="mt-6 flex justify-center gap-6 md:gap-8">
          <li>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="text-accent-foreground transition hover:text-blue-400"
            >
              <Facebook />
            </a>
          </li>
          <li>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="text-accent-foreground transition hover:text-blue-400"
            >
              <Instagram />
            </a>
          </li>
          <li>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="text-accent-foreground transition hover:text-blue-400"
            >
              <Twitter />
            </a>
          </li>
          <li>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="text-accent-foreground transition hover:text-blue-400"
            >
              <GitHub />
            </a>
          </li>
          <li>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="text-accent-foreground transition hover:text-blue-400"
            >
              <Dribble />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
