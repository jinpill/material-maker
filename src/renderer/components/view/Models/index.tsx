import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { useLoader } from "@react-three/fiber";

const Models = () => {
  const geometry = useLoader(STLLoader, "/sample-models/crown.stl");

  return (
    <group>
      <mesh geometry={geometry} />
    </group>
  );
};

export default Models;
