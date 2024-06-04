import { SvgCircleArrowLeftIcon } from "@/components/svgIcons/SvgCircleArrowLeftIcon";
import { SvgCirclePlusIcon } from "@/components/svgIcons/SvgCirclePlusIcon";
import { SvgUserPlusIcon } from "@/components/svgIcons/SvgUserPlusIcon";
import { SvgTrashIcon } from "@/components/svgIcons/SvgTrashIcon";
import { deleteServer, leaveServer } from "@/lib/actions/serverActions";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { ServerMenuButton } from "./ServerMenuButton";

type ServerMenuProps = {
  isAdmin: boolean;
  serverId: string;
  close: () => void;
};

function ServerMenu({ isAdmin, serverId, close }: ServerMenuProps) {
  const ref = useOnClickOutside<HTMLDivElement>(close);

  return (
    <>
      <div ref={ref} className="absolute bg-d-gray-600 top-16 w-52 left-2 rounded-md px-2 py-3">
        <ServerMenuButton
          type="link"
          value="Invite People"
          path={`?inviteUsersDialog=true`}
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
              type="link"
              value="Create Channel"
              path="?newChannelDialog=true"
              className="text-d-gray-150 hover:bg-d-purple hover:text-d-white"
            >
              <SvgCirclePlusIcon
                width={14}
                height={14}
                className="fill-d-gray-150 group-hover:fill-d-white"
              />
            </ServerMenuButton>
            <ServerMenuButton
              type="button"
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
            type="button"
            value="Leave Server"
            onClick={async () => await leaveServer(serverId)}
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
