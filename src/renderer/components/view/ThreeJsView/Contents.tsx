import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

type ContentsProps = {
  children?: React.ReactNode;
};

const Contents = (props: ContentsProps) => (
  <Canvas
    frameloop="demand"
    camera={{
      position: [10, 10, 10],
      fov: 75,
      near: 0.1,
      far: 10000,
    }}
  >
    <Suspense fallback={null}>{props.children}</Suspense>
  </Canvas>
);

export default Contents;
