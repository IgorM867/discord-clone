"use client";
import { useState } from "react";
import { SvgPlusIcon } from "./svgIcons/SvgPlusIcon";
import { NewServerDialogElement } from "./NewServerDialogElement";

function NewServerButton({ username }: { username: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(true);
  };
  return (
    <>
      <button
        className={`navbar-button group hover:bg-d-green hover:after:content-['Add_a_Server'] after:bg-d-gray-600 after:content-none after:absolute after:text-d-white after:left-20 after:p-2 after:rounded-lg`}
        onClick={handleClick}
      >
        <SvgPlusIcon width={28} height={28} className="fill-d-green group-hover:fill-d-white" />
      </button>
      <NewServerDialogElement
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        username={username}
        key={String(isOpen)}
      />
    </>
  );
}
export { NewServerButton };
