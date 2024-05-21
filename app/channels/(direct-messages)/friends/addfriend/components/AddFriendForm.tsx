"use client";
import { sendFriendRequest } from "@/lib/actions/userActions";
import { useFormState } from "react-dom";

type RequestState = {
  success: boolean;
  message: string;
};

const initialState: RequestState | null = null;

function AddFriendForm() {
  const [state, formAction] = useFormState(sendFriendRequest, initialState);
  return (
    <form className="text-d-white p-6 border-b border-b-d-gray-200 w-full" action={formAction}>
      <h3>ADD FRIEND</h3>
      <p className="text-d-gray-125 text-sm mb-2">
        You can add friends with their Discord usernames.
      </p>
      <div
        className={`bg-d-gray-500 p-3 rounded-md flex border-2 ${
          state != null
            ? state.success
              ? "border-d-green"
              : "border-d-red"
            : "border-transparent focus-within:border-d-blue focus-within:border-2"
        }`}
      >
        <input
          placeholder="You can add friends with their Discord usernames."
          className="flex-grow bg-transparent outline-none"
          name="username"
          maxLength={37}
          required
          autoComplete="off"
        />
        <button className="bg-d-purple p-2 rounded-md text-sm hover:brightness-90">
          Send Friend Request
        </button>
      </div>
      {state != null && (
        <p className={state.success ? "text-d-green" : "text-d-red"}>{state.message}</p>
      )}
    </form>
  );
}

export { AddFriendForm };
