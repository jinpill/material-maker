import Head from "next/head";
import useTitle from "@/hooks/useTitle";

export type WindowTitleProps = {
  name: string;
};

const WindowTitle = (props: WindowTitleProps) => {
  const title = useTitle(props.name);
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default WindowTitle;
