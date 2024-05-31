import Image from "next/image";
import Link from "next/link";

function InvalidInvitePage() {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px]  bg-d-gray-400 flex flex-col items-center p-5 rounded">
      <Image src={"/icons/invalid-invite.svg"} alt="" width={200} height={104} />
      <h1 className="text-d-white text-2xl mb-3">Invite Invalid</h1>
      <p className="text-d-gray-150 text-center mb-8">
        This invite may be expired or you migth not have permission to join.
      </p>
      <Link
        href="/"
        className="bg-d-purple text-d-white text-center p-2 rounded-sm w-full hover:brightness-90"
      >
        Continue to Discord
      </Link>
    </div>
  );
}

export { InvalidInvitePage };
