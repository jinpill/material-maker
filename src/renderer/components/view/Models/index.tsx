import { useMemo } from "react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { useLoader } from "@react-three/fiber";

const Models = () => {
  const geometry = useLoader(STLLoader, "/sample-models/crown.stl");
  const material = useMemo(() => {}, []);

  return (
    <group>
      <mesh geometry={geometry} />
    </group>
  );
};

export default Models;
