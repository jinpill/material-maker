import * as THREE from "three";
import { Sphere } from "@react-three/drei";

const MainScene = () => {
  return <Sphere args={[1, 32, 32]} material={new THREE.MeshPhysicalMaterial()} />;
};

export default MainScene;
