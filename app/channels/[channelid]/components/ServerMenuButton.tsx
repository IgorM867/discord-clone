import { ReactNode } from "react";

type ServerMenuButtonProps = {
  children: ReactNode;
  value: string;
  onClick: () => void;
  className: string;
};

function ServerMenuButton({ children, value, onClick, className }: ServerMenuButtonProps) {
  return (
    <button
      className={`group font-normal text-sm flex rounded-md justify-between items-center w-full p-2 ${className}`}
      onClick={onClick}
    >
      <p>{value}</p>
      {children}
    </button>
  );
}
export { ServerMenuButton };
