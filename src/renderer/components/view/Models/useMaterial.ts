import * as THREE from "three";
import useMaterialStore from "@/stores/useMaterialStore";
import { useEffect, useState } from "react";

const useMaterial = () => {
  const { config } = useMaterialStore();

  const [material, setMaterial] = useState<THREE.Material>(
    new THREE.MeshBasicMaterial(),
  );

  const updateMaterial = (newMaterial: THREE.Material) => {
    setMaterial((prev) => {
      prev.dispose();
      return newMaterial;
    });
  };

  useEffect(() => {
    switch (config.type) {
      case "MeshPhongMaterial":
        updateMaterial(new THREE.MeshPhongMaterial(config));
        break;
      default:
        updateMaterial(new THREE.MeshBasicMaterial());
        break;
    }
  }, [config]);

  return material;
};

export default useMaterial;
