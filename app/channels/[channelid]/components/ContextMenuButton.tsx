type ContextMenuButtonProps = { option: { name: string; event: () => void } };

function ContextMenuButton({ option }: ContextMenuButtonProps) {
  return (
    <button
      className="p-2 hover:bg-d-purple cursor-pointer rounded-sm block w-full text-left"
      onClick={option.event}
    >
      {option.name}
    </button>
  );
}

export { ContextMenuButton };
