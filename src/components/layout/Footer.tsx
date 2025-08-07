import Dribble from "@/assets/icons/Dribble";
import Facebook from "@/assets/icons/Facebook";
import GitHub from "@/assets/icons/GitHub";
import Instagram from "@/assets/icons/Instagram";
import Logo from "@/assets/icons/logo";
import Twitter from "@/assets/icons/Twitter";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-200">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center gap-2">
          <Logo />
          <h1 className="font-bold text-3xl text-blue-400">Tour Matrix</h1>
        </div>

        <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-neutral-200">
          Discover unforgettable journeys with Tour Matrix – your gateway to
          adventure and comfort.
        </p>

        <ul className="mt-6 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
          {["About", "Careers", "History", "Services", "Projects", "Blog"].map(
            (item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-neutral-200 transition hover:text-blue-400"
                >
                  {item}
                </a>
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
              className="text-neutral-200 transition hover:text-blue-400"
            >
              <Facebook />
            </a>
          </li>
          <li>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-200 transition hover:text-blue-400"
            >
              <Instagram />
            </a>
          </li>
          <li>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-200 transition hover:text-blue-400"
            >
              <Twitter />
            </a>
          </li>
          <li>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-200 transition hover:text-blue-400"
            >
              <GitHub />
            </a>
          </li>
          <li>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-200 transition hover:text-blue-400"
            >
              <Dribble />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
