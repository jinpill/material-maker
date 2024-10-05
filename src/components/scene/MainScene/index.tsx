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
      <Sphere args={[1, 64, 64]} material={material} rotation={[Math.PI / 2, 0, 0]} />
    </>
  );
};

export default MainScene;
