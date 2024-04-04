import dynamic from "next/dynamic";

const ThreeJsView = dynamic(
  () => import("./Contents").then((mod) => mod.default),
  {
    ssr: false,
  },
);

export default ThreeJsView;
