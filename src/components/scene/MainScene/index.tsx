import { Sphere, Environment } from "@react-three/drei";
import { useMaterialStore } from "@/stores/useMaterialStore";
import { useEnvironmentStore } from "@/stores/useEnvironmentStore";

const MainScene = () => {
  const { useMaterial } = useMaterialStore();
  const material = useMaterial();
  const { preset } = useEnvironmentStore();

  return (
    <>
      {preset !== "none" && <Environment preset={preset} />}
      <Sphere args={[1, 32, 32]} material={material} />
    </>
  );
};

export default MainScene;
