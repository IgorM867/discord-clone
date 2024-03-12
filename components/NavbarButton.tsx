import Link from "next/link";
import { ReactNode } from "react";

type NavbarButtonProps = {
  label: string;
  href: string;
  isActive: boolean;
  children: ReactNode;
};

function NavbarButton({ label, href, isActive, children }: NavbarButtonProps) {
  return (
    <Link
      href={href}
      className={`navbar-button group hover:bg-d-purple text-d-light-gray before:rounded-md before:bg-white before:absolute before:w-10 before:left-[-36px] ${
        isActive ? "!bg-d-purple !rounded-2xl before:h-10 !before:hover:h-10" : "before:hover:h-6 "
      }`}
    >
      {children}
      <div className="bg-d-gray-600 content-none absolute text-d-white left-20 p-2 rounded-lg hidden group-hover:block">
        {label}
      </div>
    </Link>
  );
}
export { NavbarButton };
