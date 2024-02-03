import { SvgXIcon } from "@/components/svgIcons/SvgXIcon";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { createChannel } from "@/lib/actions";
import Image from "next/image";
import { useFormState } from "react-dom";

const initialState = {
  error: "",
};

type NewChannelFormProps = {
  isOpen: boolean;
  serverId: string;
  close: () => void;
};
export function NewChannelForm({ isOpen, serverId, close }: NewChannelFormProps) {
  const [state, formAction] = useFormState(createChannel, initialState);
  const ref = useOnClickOutside<HTMLDialogElement>(close);
  return (
    <>
      {isOpen && <div className="backdrop"></div>}
      <dialog
        ref={ref}
        open={isOpen}
        className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]  rounded-md max-w-lg z-10 bg-d-gray-300 min-w-[450px] text-d-white overflow-hidden"
      >
        <header className="flex justify-between p-5">
          <h2 className="text-2xl">Create Channel</h2>
          <SvgXIcon
            width={28}
            height={28}
            className="fill-d-gray-150 hover:fill-d-gray-100 cursor-pointer"
            onClick={close}
          />
        </header>
        <form className="mt-2" action={formAction}>
          <input type="hidden" name="serverid" value={serverId} />
          <div className="p-5">
            <label className=" text-xs font-bold ">
              <p className="mb-2">CHANNEL NAME</p>
              <div className="flex bg-d-gray-500 rounded-sm p-2">
                <Image src={"/icons/hashtag-solid.svg"} alt="hashtag" width={20} height={20} />
                <input
                  className="bg-d-gray-500 w-full p-1 outline-none text-d-gray-100 font-normal text-base"
                  placeholder="new-channel"
                  name="channelname"
                  required
                />
              </div>
            </label>
            {state && <p className="text-red-500">{`${state.error}`}</p>}
          </div>
          <div className="bg-d-gray-400 flex justify-end gap-3 p-5 ">
            <button onClick={close} className="font-normal text-sm hover:underline">
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
      </dialog>
    </>
  );
}
