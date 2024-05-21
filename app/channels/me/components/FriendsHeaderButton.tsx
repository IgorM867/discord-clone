type FriendsHeaderButtonProps = {
  value: string;
  isActive: boolean;
  onClick: () => void;
};

function FriendsHeaderButton({ value, isActive, onClick }: FriendsHeaderButtonProps) {
  return (
    <button
      className={`font-normal rounded-md p-1 px-2 mx-3 cursor-pointer hover:text-d-gray-100 hover:bg-d-gray-200 ${
        isActive ? "bg-d-gray-200 text-d-gray-100 hover:bg-d-gray-250" : "text-d-gray-125"
      }`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export { FriendsHeaderButton };
