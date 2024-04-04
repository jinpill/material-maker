import { Canvas } from "@react-three/fiber";
import Controls from "@/components/view/Controls";
import AxesHelper from "./AxesHelper";

const MainView = () => {
  return (
    <Canvas
      camera={{
        position: [10, 10, 10],
        fov: 75,
        near: 0.1,
        far: 10000,
      }}
      frameloop="demand"
    >
      <Controls />
      <AxesHelper />
    </Canvas>
  );
};

export default MainView;
