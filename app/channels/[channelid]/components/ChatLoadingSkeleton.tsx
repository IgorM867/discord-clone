function ChatLoadingSkeleton() {
  return (
    <ol className="overflow-y-scroll  h-[calc(100%_-_64px)] flex flex-col scrollbar ">
      <li className="pl-5 flex last:mb-6 py-1">
        <SkeletonBlock className="mr-2" circle />
        <div className="flex flex-col gap-1">
          <SkeletonBlock className="w-28 h-5" />
          <div className="flex gap-1">
            <SkeletonBlock className="w-8 h-5" />
            <SkeletonBlock className="w-16 h-5" />
            <SkeletonBlock className="w-16 h-5" />
          </div>
        </div>
      </li>
      <li className="pl-5 last:mb-6 py-1 flex gap-1">
        <SkeletonBlock className="w-20 h-5" />
        <SkeletonBlock className="w-32 h-5" />
        <SkeletonBlock className="w-14 h-5" />
        <SkeletonBlock className="w-20 h-5" />
        <SkeletonBlock className="w-10 h-5" />
      </li>
      <li className="pl-5 last:mb-6 py-1 flex gap-1">
        <SkeletonBlock className="w-14 h-5" />
        <SkeletonBlock className="w-10 h-5" />
        <SkeletonBlock className="w-32 h-5" />
        <SkeletonBlock className="w-16 h-5" />
      </li>
      <li className="pl-5 flex last:mb-6 py-1">
        <SkeletonBlock className="mr-2" circle />
        <div className="flex flex-col gap-1">
          <SkeletonBlock className="w-32 h-5" />
          <div className="flex gap-1">
            <SkeletonBlock className="w-16 h-5" />
            <SkeletonBlock className="w-20 h-5" />
            <SkeletonBlock className="w-10 h-5" />
            <SkeletonBlock className="w-10 h-5" />
          </div>
        </div>
      </li>
      <li className="pl-5 last:mb-6 py-1">
        <SkeletonBlock className="w-60 h-60" />
      </li>
      <li className="pl-5 flex gap-1 last:mb-6 py-1">
        <SkeletonBlock className="w-16 h-5" />
        <SkeletonBlock className="w-20 h-5" />
        <SkeletonBlock className="w-10 h-5" />
      </li>
      <li className="pl-5 flex last:mb-6 py-1">
        <SkeletonBlock className="mr-2" circle />
        <div className="flex flex-col gap-1">
          <SkeletonBlock className="w-28 h-5" />
          <div className="flex gap-1">
            <SkeletonBlock className="w-8 h-5" />
            <SkeletonBlock className="w-16 h-5" />
            <SkeletonBlock className="w-16 h-5" />
          </div>
        </div>
      </li>
      <li className="pl-5 last:mb-6 py-1 flex gap-1">
        <SkeletonBlock className="w-20 h-5" />
        <SkeletonBlock className="w-32 h-5" />
        <SkeletonBlock className="w-14 h-5" />
        <SkeletonBlock className="w-20 h-5" />
        <SkeletonBlock className="w-10 h-5" />
      </li>
      <li className="pl-5 last:mb-6 py-1">
        <SkeletonBlock className="w-60 h-60" />
      </li>
    </ol>
  );
}

function SkeletonBlock({ className, circle }: { className: string; circle?: boolean }) {
  return (
    <div
      className={`bg-d-gray-500 animate-pulse ${
        circle ? "size-10 rounded-full" : "rounded-md"
      } ${className}`}
    />
  );
}
export { ChatLoadingSkeleton };
