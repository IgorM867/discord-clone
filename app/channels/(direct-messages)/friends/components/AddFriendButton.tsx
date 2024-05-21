import Link from "next/link";

type AddFriendButtonProps = {
  isActive: boolean;
  variant?: "green" | "purple";
};

function AddFriendButton({ isActive, variant = "green" }: AddFriendButtonProps) {
  return (
    <Link
      href="./addfriend"
      className={`font-normal rounded-md p-1 mx-3 cursor-pointer ${
        variant === "purple"
          ? ` ${isActive ? "text-d-purple" : "bg-d-purple text-d-gray-100 hover:brightness-110"}`
          : `${isActive ? "text-d-green brightness-150" : "bg-d-green text-d-gray-100"}`
      }`}
    >
      Add Friend
    </Link>
  );
}

export { AddFriendButton };
