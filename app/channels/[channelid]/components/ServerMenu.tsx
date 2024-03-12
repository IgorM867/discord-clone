import { SvgCircleArrowLeftIcon } from "@/components/svgIcons/SvgCircleArrowLeftIcon";
import { SvgCirclePlusIcon } from "@/components/svgIcons/SvgCirclePlusIcon";
import { SvgTrashIcon } from "@/components/svgIcons/SvgTrashIcon";
import { SvgUserPlusIcon } from "@/components/svgIcons/SvgUserPlusIcon";
import { ServerMenuButton } from "./ServerMenuButton";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { deleteServer } from "@/lib/actions/serverActions";

type ServerMenuProps = {
  isAdmin: boolean;
  serverId: string;
  close: () => void;
  showForm: () => void;
};

function ServerMenu({ isAdmin, serverId, close, showForm }: ServerMenuProps) {
  const ref = useOnClickOutside<HTMLDivElement>(close);

  return (
    <>
      <div ref={ref} className="absolute bg-d-gray-600 top-16 w-52 left-2 rounded-md px-2 py-3">
        <ServerMenuButton
          value="Invite People"
          onClick={() => {}}
          className="text-d-purple hover:bg-d-purple hover:text-d-white"
        >
          <SvgUserPlusIcon
            width={14}
            height={14}
            className="fill-d-purple group-hover:fill-d-white"
          />
        </ServerMenuButton>
        {isAdmin ? (
          <>
            <ServerMenuButton
              value="Create Channel"
              onClick={showForm}
              className="text-d-gray-150 hover:bg-d-purple hover:text-d-white"
            >
              <SvgCirclePlusIcon
                width={14}
                height={14}
                className="fill-d-gray-150 group-hover:fill-d-white"
              />
            </ServerMenuButton>
            <ServerMenuButton
              value="Delete Server"
              onClick={async () => await deleteServer(serverId)}
              className="text-d-red hover:bg-d-red hover:text-d-white"
            >
              <SvgTrashIcon
                width={14}
                height={14}
                className="fill-d-red group-hover:fill-d-white"
              />
            </ServerMenuButton>
          </>
        ) : (
          <ServerMenuButton
            value="Leave Server"
            onClick={() => {}}
            className="text-d-red hover:bg-d-red hover:text-d-white"
          >
            <SvgCircleArrowLeftIcon
              width={14}
              height={14}
              className="fill-d-red group-hover:fill-d-white"
            />
          </ServerMenuButton>
        )}
      </div>
    </>
  );
}
export { ServerMenu };
