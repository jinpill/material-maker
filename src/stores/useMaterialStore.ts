import { useEffect, useState } from "react";
import { create } from "zustand";
import * as THREE from "three";

export type MaterialStoreState = {
  config: MeshMaterialConfig;
};

export type MaterialStoreActions = {
  useMaterial: () => MeshMaterial;
};

export const useMaterialStore = create<MaterialStoreState & MaterialStoreActions>((set, get) => ({
  config: {
    type: "MeshPhysicalMaterial",
  },
  useMaterial: () => {
    const { config } = get();
    const [material, setMaterial] = useState<MeshMaterial>(getMaterial(config));

    useEffect(() => {
      setMaterial((prevMaterial) => {
        const newMaterial = getMaterial(config);
        setTimeout(() => prevMaterial.dispose(), 0);
        return newMaterial;
      });
    }, [config]);

    return material;
  },
}));

const getMaterial = (config: MeshMaterialConfig): MeshMaterial => {
  switch (config.type) {
    case "MeshMatcapMaterial": {
      const material = new THREE.MeshMatcapMaterial();
      return material;
    }
    case "MeshToonMaterial": {
      const material = new THREE.MeshToonMaterial();
      return material;
    }
    case "MeshBasicMaterial": {
      const material = new THREE.MeshBasicMaterial();
      return material;
    }
    case "MeshDepthMaterial": {
      const material = new THREE.MeshDepthMaterial();
      return material;
    }
    case "MeshPhongMaterial": {
      const material = new THREE.MeshPhongMaterial();
      return material;
    }
    case "MeshNormalMaterial": {
      const material = new THREE.MeshNormalMaterial();
      return material;
    }
    case "MeshLambertMaterial": {
      const material = new THREE.MeshLambertMaterial();
      return material;
    }
    case "MeshDistanceMaterial": {
      const material = new THREE.MeshDistanceMaterial();
      return material;
    }
    case "MeshPhysicalMaterial": {
      const material = new THREE.MeshPhysicalMaterial();
      return material;
    }
    case "MeshStandardMaterial": {
      const material = new THREE.MeshStandardMaterial();
      return material;
    }
  }
};

export type MeshMaterialConfig =
  | MeshMatcapMaterialConfig
  | MeshToonMaterialConfig
  | MeshBasicMaterialConfig
  | MeshDepthMaterialConfig
  | MeshPhongMaterialConfig
  | MeshNormalMaterialConfig
  | MeshLambertMaterialConfig
  | MeshDistanceMaterialConfig
  | MeshPhysicalMaterialConfig
  | MeshStandardMaterialConfig;

export type MeshMaterial =
  | THREE.MeshMatcapMaterial
  | THREE.MeshToonMaterial
  | THREE.MeshBasicMaterial
  | THREE.MeshDepthMaterial
  | THREE.MeshPhongMaterial
  | THREE.MeshNormalMaterial
  | THREE.MeshLambertMaterial
  | THREE.MeshDistanceMaterial
  | THREE.MeshPhysicalMaterial
  | THREE.MeshStandardMaterial;

export type MeshMatcapMaterialConfig = {
  type: "MeshMatcapMaterial";
};

export type MeshToonMaterialConfig = {
  type: "MeshToonMaterial";
};

export type MeshBasicMaterialConfig = {
  type: "MeshBasicMaterial";
};

export type MeshDepthMaterialConfig = {
  type: "MeshDepthMaterial";
};

export type MeshPhongMaterialConfig = {
  type: "MeshPhongMaterial";
};

export type MeshNormalMaterialConfig = {
  type: "MeshNormalMaterial";
};

export type MeshLambertMaterialConfig = {
  type: "MeshLambertMaterial";
};

export type MeshDistanceMaterialConfig = {
  type: "MeshDistanceMaterial";
};

export type MeshPhysicalMaterialConfig = {
  type: "MeshPhysicalMaterial";
};

export type MeshStandardMaterialConfig = {
  type: "MeshStandardMaterial";
};
