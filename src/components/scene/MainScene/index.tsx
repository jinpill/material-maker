import * as THREE from "three";
import { Sphere } from "@react-three/drei";
import { useMaterialStore } from "@/stores/useMaterialStore";

const MainScene = () => {
  const { useMaterial } = useMaterialStore();
  const material = useMaterial();

  return <Sphere args={[1, 32, 32]} material={material} />;
};

export default MainScene;
