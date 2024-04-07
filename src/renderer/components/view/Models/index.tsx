import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { useLoader } from "@react-three/fiber";
import useMaterial from "./useMaterial";

const Models = () => {
  const geometry = useLoader(STLLoader, "/sample-models/crown.stl");
  const material = useMaterial();

  return (
    <group>
      <mesh geometry={geometry} material={material} />
    </group>
  );
};

export default Models;
