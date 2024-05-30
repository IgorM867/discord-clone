type pageProps = {
  params: {
    inviteCode: string;
  };
};

function page({ params }: pageProps) {
  return <div>{params.inviteCode}</div>;
}

export default page;
