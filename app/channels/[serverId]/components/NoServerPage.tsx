import { SignOutButton } from "@/components/SignOutButton";
import { NoChannelsPage } from "./NoChannelsPage";

function NoServerPage() {
  return (
    <>
      <div className="bg-d-gray-450 w-60 min-w-60 flex flex-col justify-between">
        <div className="px-3 py-4 flex flex-col gap-4">
          <div className="bg-d-gray-200 w-20 h-4 rounded-md"></div>
          <div className="flex flex-col gap-4 pl-2">
            <SkeletonWithCircle className="w-24" />
            <SkeletonWithCircle className="w-20" />
            <SkeletonWithCircle className="w-24" />
            <SkeletonWithCircle className="w-20" />
            <SkeletonWithCircle className="w-28" />
            <SkeletonWithCircle className="w-32" />
          </div>
          <div className="bg-d-gray-200 w-20 h-4 rounded-md mt-5"></div>
          <div className="flex flex-col gap-4 pl-2">
            <SkeletonWithCircle className="w-24" />
            <SkeletonWithCircle className="w-20" />
            <SkeletonWithCircle className="w-24" />
            <SkeletonWithCircle className="w-20" />
            <SkeletonWithCircle className="w-28" />
            <SkeletonWithCircle className="w-32" />
          </div>
        </div>
        <div className="bg-d-gray-500 flex justify-end p-2">
          <SignOutButton />
        </div>
      </div>
      <NoChannelsPage />
    </>
  );
}
function SkeletonWithCircle({ className }: { className: string }) {
  return (
    <div className="flex gap-2">
      <div className="bg-d-gray-200 size-4 rounded-full"></div>
      <div className={`bg-d-gray-200 h-4 rounded-lg ${className}`}></div>
    </div>
  );
}

export { NoServerPage };
