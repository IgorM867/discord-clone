import { useFormStatus } from "react-dom";

function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      aria-disabled={pending}
      disabled={pending}
      className="bg-d-purple p-2 rounded-md text-d-white font-bold text-xl hover:bg-d-gray-450 mt-5 disabled:cursor-not-allowed disabled:bg-d-gray-450"
    >
      {text}
    </button>
  );
}
export { SubmitButton };
