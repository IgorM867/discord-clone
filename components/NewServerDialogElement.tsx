"use client";
import { Input } from "./Input";
import { Dispatch, SetStateAction, useRef } from "react";
import { createServer } from "@/lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import { SvgXIcon } from "./svgIcons/SvgXIcon";

const initialState = {
  error: "",
};

type NewServerDialogElementProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  username: string;
};

export function NewServerDialogElement({
  isOpen,
  setIsOpen,
  username,
}: NewServerDialogElementProps) {
  const [state, formAction] = useFormState(createServer, initialState);
  const ref = useRef<HTMLFormElement>(null);
  return (
    <dialog
      open={isOpen}
      className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] p-5 rounded-md max-w-lg"
    >
      <form className="w-full h-full" action={formAction} ref={ref}>
        <h2 className="font-bold text-2xl text-center mb-2">Create a server</h2>
        <SvgXIcon
          width={24}
          height={24}
          className="fill-d-gray absolute right-5 top-5 hover:fill-d-dark-gray cursor-pointer"
          onClick={() => {
            ref.current?.reset();
            setIsOpen(false);
          }}
        />
        <p className="text-center">
          Give your new server a personality with a name and an icon. You can always change it later
        </p>
        <Input
          name="servername"
          type="text"
          label="SERVER NAME"
          defaultValue={`${username}'s server`}
        />
        {state && <p className="text-red-500">{`${state.error}`}</p>}
        <SubmitButton text="Create" />
      </form>
    </dialog>
  );
}

function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      aria-disabled={pending}
      disabled={pending}
      className="float-right bg-d-purple text-d-white p-2 rounded-lg px-4 cursor-pointer mt-8"
    >
      {text}
    </button>
  );
}
