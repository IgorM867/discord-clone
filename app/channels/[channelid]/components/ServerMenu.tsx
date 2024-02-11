import { SvgCircleArrowLeftIcon } from "@/components/svgIcons/SvgCircleArrowLeftIcon";
import { SvgCirclePlusIcon } from "@/components/svgIcons/SvgCirclePlusIcon";
import { SvgTrashIcon } from "@/components/svgIcons/SvgTrashIcon";
import { SvgUserPlusIcon } from "@/components/svgIcons/SvgUserPlusIcon";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { deleteServer } from "@/lib/actions";

type ServerMenuProps = {
  isAdmin: boolean;
  serverId: string;
  close: () => void;
  showForm: () => void;
};

export function ServerMenu({ isAdmin, serverId, close, showForm }: ServerMenuProps) {
  const ref = useOnClickOutside<HTMLDivElement>(close);

  return (
    <>
      <div ref={ref} className="absolute bg-d-gray-600 top-16 w-52 left-2 rounded-md px-2 py-3">
        <button className="group text-d-purple font-normal text-sm flex rounded-md justify-between items-center w-full p-2 hover:bg-d-purple hover:text-d-white">
          <p>Invite People</p>
          <SvgUserPlusIcon
            width={14}
            height={14}
            className="fill-d-purple group-hover:fill-d-white"
          />
        </button>

        {isAdmin ? (
          <>
            <button
              className="group text-d-gray-150 font-normal text-sm flex rounded-md justify-between items-center w-full p-2 hover:bg-d-purple hover:text-d-white"
              onClick={showForm}
            >
              <p>Create Channel</p>
              <SvgCirclePlusIcon
                width={14}
                height={14}
                className="fill-d-gray-150 group-hover:fill-d-white"
              />
            </button>
            <button
              className="group text-d-red font-normal text-sm flex rounded-md justify-between items-center w-full p-2 hover:bg-d-red hover:text-d-white"
              onClick={async () => await deleteServer(serverId)}
            >
              <p>Delete Server</p>
              <SvgTrashIcon
                width={14}
                height={14}
                className="fill-d-red group-hover:fill-d-white"
              />
            </button>
          </>
        ) : (
          <button className="group text-d-red font-normal text-sm flex rounded-md justify-between items-center w-full p-2 hover:bg-d-red hover:text-d-white">
            <p>Leave Server</p>
            <SvgCircleArrowLeftIcon
              width={14}
              height={14}
              className="fill-d-red group-hover:fill-d-white"
            />
          </button>
        )}
      </div>
    </>
  );
}
