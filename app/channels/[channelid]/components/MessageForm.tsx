"use client";
import { useRef } from "react";

type MessageFormProps = {
  channelName: string;
  handleFormSubmit: (formData: FormData) => Promise<void>;
};

function MessageForm({ channelName, handleFormSubmit }: MessageFormProps) {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={ref}
      className="h-16 px-5"
      action={async (formData: FormData) => {
        await handleFormSubmit(formData);
        ref.current?.reset();
      }}
    >
      <input
        name="message"
        className="bg-d-gray-250 w-full rounded-md p-2 px-5 outline-none text-d-gray-100 text-base placeholder:text-d-gray-150"
        placeholder={`Message #${channelName}`}
        autoComplete="off"
        type="text"
      />
    </form>
  );
}

export { MessageForm };
