import Link from "next/link";
import { ReactNode } from "react";

type ServerMenuButtonProps =
  | {
      type: "button";
      children: ReactNode;
      value: string;
      onClick: () => void;
      className: string;
    }
  | {
      type: "link";
      children: ReactNode;
      value: string;
      path: string;
      className: string;
    };

function ServerMenuButton(props: ServerMenuButtonProps) {
  const { children, value, className } = props;

  if (props.type === "button") {
    return (
      <button
        className={`group font-normal text-sm flex rounded-md justify-between items-center w-full p-2 ${className}`}
        onClick={props.onClick}
      >
        <p>{value}</p>
        {children}
      </button>
    );
  } else {
    return (
      <Link
        href={props.path}
        className={`group font-normal text-sm flex rounded-md justify-between items-center w-full p-2 ${className}`}
      >
        <p>{value}</p>
        {children}
      </Link>
    );
  }
}
export { ServerMenuButton };
