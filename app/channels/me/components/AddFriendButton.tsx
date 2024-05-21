type AddFriendButtonProps = {
  isActive: boolean;
  variant?: "green" | "purple";
  onClick: () => void;
};

function AddFriendButton({ isActive, variant = "green", onClick }: AddFriendButtonProps) {
  return (
    <button
      className={`font-normal rounded-md p-1 mx-3 cursor-pointer ${
        variant === "purple"
          ? ` ${isActive ? "text-d-purple" : "bg-d-purple text-d-gray-100 hover:brightness-110"}`
          : `${isActive ? "text-d-green brightness-150" : "bg-d-green text-d-gray-100"}`
      }`}
      onClick={onClick}
    >
      Add Friend
    </button>
  );
}

export { AddFriendButton };
