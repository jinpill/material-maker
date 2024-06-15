import { TooltipArea, OptionsArea } from "@jinpill/react-libs";
import "@jinpill/react-libs/dist/variables.css";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Component {...pageProps} />
    <TooltipArea />
    <OptionsArea />
  </>
);

export default App;
