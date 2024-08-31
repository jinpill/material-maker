import { useEffect, useMemo, useRef, useState } from "react";
import { create } from "zustand";
import * as THREE from "three";

export const MATERIAL_TYPES = [
  "MeshBasicMaterial",
  "MeshDepthMaterial",
  "MeshPhysicalMaterial",
] as const;
export type MaterialType = (typeof MATERIAL_TYPES)[number];

type DefaultConfigs = {
  [key in MaterialType]: MaterialConfigMap[key];
};

const DEFAULT_CONFIGS: DefaultConfigs = {
  MeshBasicMaterial: {
    type: "MeshBasicMaterial",
    color: "#000000",
  },
  MeshDepthMaterial: {
    type: "MeshDepthMaterial",
  },
  MeshPhysicalMaterial: {
    type: "MeshPhysicalMaterial",
    color: "#000000",
  },
};

export type MaterialStore = {
  config: MaterialConfig;
  getConfig: () => MaterialConfig;
  setConfig: SetConfig;
  useMaterial: () => THREE.Material;
};

export type MaterialConstructor = {
  MeshBasicMaterial: THREE.MeshBasicMaterial;
  MeshDepthMaterial: THREE.MeshDepthMaterial;
  MeshPhysicalMaterial: THREE.MeshPhysicalMaterial;
};

export type MaterialConfigMap = {
  MeshBasicMaterial: MeshBasicMaterialConfig;
  MeshDepthMaterial: MeshDepthMaterialConfig;
  MeshPhysicalMaterial: MeshPhysicalMaterialConfig;
};

export type MaterialConfig = MaterialConfigMap[keyof MaterialConfigMap];

export type SetConfig = <T extends MaterialType, C extends MaterialConfigMap[T]>(
  type: T,
  config: Partial<C>
) => void;

export type MeshBasicMaterialConfig = {
  type: "MeshBasicMaterial";
  color: string;
};

export type MeshDepthMaterialConfig = {
  type: "MeshDepthMaterial";
};

export type MeshPhysicalMaterialConfig = {
  type: "MeshPhysicalMaterial";
  color: string;
};

export const useMaterialStore = create<MaterialStore>((set, get) => {
  const initialStore: MaterialStore = {
    config: {
      type: "MeshBasicMaterial",
      color: "#000000",
    },
    getConfig: () => get().config,
    setConfig: <T extends MaterialType, C extends MaterialConfigMap[T]>(
      type: T,
      config: Partial<C>
    ) => {
      set((state) => {
        if (state.config.type === type) {
          return {
            config: {
              ...state.config,
              ...config,
            },
          };
        }

        return {
          config: {
            ...DEFAULT_CONFIGS[type],
            ...config,
          },
        };
      });
    },
    useMaterial: () => {
      const { config } = get();

      const material = useMemo(() => {
        const material = getMaterial[config.type](config);
        if (material) return material;
        else return new THREE.MeshBasicMaterial();
      }, [config]);

      const materialRef = useRef<THREE.Material>(material);

      useEffect(() => {
        const prevMaterial = material;
        materialRef.current = prevMaterial;
        return prevMaterial.dispose;
      }, []);

      return material;
    },
  };

  type GetMaterial = {
    [key in MaterialType]: (config: MaterialConfigMap[MaterialType]) => MaterialConstructor[key];
  };
  const getMaterial: GetMaterial = {
    MeshBasicMaterial: (config) => {
      const _config = config as MeshBasicMaterialConfig;
      return new THREE.MeshBasicMaterial({
        color: _config.color,
      });
    },
    MeshDepthMaterial: (config) => {
      const _config = config as MeshDepthMaterialConfig;
      return new THREE.MeshDepthMaterial({});
    },
    MeshPhysicalMaterial: (config) => {
      const _config = config as MeshPhysicalMaterialConfig;
      return new THREE.MeshPhysicalMaterial({
        color: _config.color,
      });
    },
  };

  return initialStore;
});
