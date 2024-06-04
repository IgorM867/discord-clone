"use client";
import Image from "next/image";
import { createChannel } from "../lib/actions";
import { useFormState } from "react-dom";
import { Modal } from "@/components/Modal";
import { useRouter } from "next/navigation";

const initialState = {
  error: "",
};

type NewChannelFormProps = {
  serverId: string;
};
function NewChannelForm({ serverId }: NewChannelFormProps) {
  const [state, formAction] = useFormState(createChannel, initialState);
  const router = useRouter();

  const closeModal = () => {
    router.back();
  };
  return (
    <Modal headerLabel="Create Channel" searchParam="newChannelDialog">
      <form className="mt-2" action={formAction}>
        <input type="hidden" name="serverid" value={serverId} />
        <div className="p-5">
          <label className=" text-xs font-bold ">
            <p className="mb-2">CHANNEL NAME</p>
            <div className="flex bg-d-gray-550 rounded-sm p-2">
              <Image src={"/icons/hashtag-solid.svg"} alt="hashtag" width={20} height={20} />
              <input
                className="bg-d-gray-550 w-full p-1 outline-none text-d-gray-100 font-normal text-base"
                placeholder="new-channel"
                name="channelname"
                required
              />
            </div>
          </label>
          {state && <p className="text-red-500">{`${state.error}`}</p>}
        </div>
        <div className="bg-d-gray-450 flex justify-end gap-3 p-5 ">
          <button onClick={closeModal} className="font-normal text-sm hover:underline">
            Cancel
          </button>
          <button
            className="bg-d-purple p-2 rounded-sm brightness-125 hover:brightness-100"
            type="submit"
          >
            Create Channel
          </button>
        </div>
      </form>
    </Modal>
  );
}
export { NewChannelForm };
