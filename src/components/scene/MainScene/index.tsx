import { useEffect } from "react";
import { Sphere, Environment } from "@react-three/drei";
import { useMaterialStore } from "@/stores/useMaterialStore";
import { useEnvironmentStore } from "@/stores/useEnvironmentStore";

const MainScene = () => {
  const { preset, intensity, rotation } = useEnvironmentStore();
  const { useMaterial } = useMaterialStore();
  const material = useMaterial();

  useEffect(() => {
    console.log(material);
  }, [material]);

  return (
    <>
      {preset !== "none" && (
        <Environment
          preset={preset}
          environmentIntensity={intensity}
          environmentRotation={rotation}
        />
      )}
      <Sphere args={[1, 32, 32]} material={material} />
    </>
  );
};

export default MainScene;
