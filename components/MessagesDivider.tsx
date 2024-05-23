function MessagesDivider({ text }: { text: string }) {
  return (
    <div className="flex flex-row px-5 before:flex-1 before:border-b-[1px] before:m-auto before:border-d-gray-200 after:flex-1 after:border-b-[1px] after:m-auto after:border-d-gray-200 ">
      <span className="text-d-gray-150 p-1 text-sm">{text}</span>
    </div>
  );
}

export { MessagesDivider };
