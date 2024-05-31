import { redirect } from "next/navigation";

type pageProps = {
  params: {
    inviteCode: string;
  };
};

function page({ params }: pageProps) {
  redirect(`/invite/${params.inviteCode}`);
}

export default page;
