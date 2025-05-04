import { useState } from "react";
import { LogoIcon } from "../atoms/icons";
import { Button, buttonVariants } from "../atoms/ui/button";

const routeList = [
  { href: "#features", label: "Funcionalidades" },
  { href: "#testimonials", label: "Testimonios" },
  { href: "#pricing", label: "Planes Universidades" },
];

interface NavbarProps {
  onCreateAccount: () => void;
}

export const Navbar = ({ onCreateAccount }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);  return (
    <header className="sticky top-0 z-40 w-full border-b border-orange-200 bg-white">
      <nav className="flex items-center justify-between h-14 px-4 w-full max-w-[1400px] mx-auto">
        <a href="/" className="flex items-center text-xl font-bold w-26 h-9.5">
          <LogoIcon />
        </a>

        {/* landing links */}
        <div className="hidden md:flex space-x-4">
          {routeList.map(({ href, label }) => (
            <a key={href} href={href} onClick={() => setIsOpen(false)} className={buttonVariants({ variant: "ghost" })}>
              {label}
            </a>
          ))}
        </div>

        {/* login and registry buttons */}
        <div className="hidden md:flex items-center space-x-4">
        </div>

        {/* Mobile Menu */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>☰</button>
      </nav>

      {isOpen && (
        <div className="md:hidden flex flex-col items-center">
          {routeList.map(({ href, label }) => (
            <a key={href} href={href} className="py-2">{label}</a>
          ))}
        </div>
      )}
    </header>
  );
};
