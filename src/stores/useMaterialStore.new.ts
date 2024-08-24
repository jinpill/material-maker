import { useEffect, useMemo, useRef, useState } from "react";
import { create } from "zustand";
import * as THREE from "three";

export const MATERIAL_TYPES = ["MeshBasicMaterial", "MeshDepthMaterial"] as const;

type DefaultConfigs = {
  [key in (typeof MATERIAL_TYPES)[number]]: MaterialConfig[key];
};

const DEFAULT_CONFIGS: DefaultConfigs = {
  MeshBasicMaterial: {
    type: "MeshBasicMaterial",
    color: "#000000",
  },
  MeshDepthMaterial: {
    type: "MeshDepthMaterial",
  },
};

export type MaterialStore = {
  config: MaterialConfig[keyof MaterialConfig];
  getConfig: () => MaterialConfig[keyof MaterialConfig];
  setConfig: <T extends (typeof MATERIAL_TYPES)[number], C extends MaterialConfig[T]>(
    type: T,
    config: C
  ) => void;
  useMaterial: () => THREE.Material;
};

export type MaterialConstructor = {
  MeshBasicMaterial: THREE.MeshBasicMaterial;
  MeshDepthMaterial: THREE.MeshDepthMaterial;
};

export type MaterialConfig = {
  MeshBasicMaterial: MeshBasicMaterialConfig;
  MeshDepthMaterial: MeshDepthMaterialConfig;
};

export type MeshBasicMaterialConfig = {
  type: "MeshBasicMaterial";
  color: string;
};

export type MeshDepthMaterialConfig = {
  type: "MeshDepthMaterial";
};

export const useMaterialStore = create<MaterialStore>((set, get) => {
  const initialStore: MaterialStore = {
    config: {
      type: "MeshBasicMaterial",
      color: "#000000",
    },
    getConfig: () => get().config,
    setConfig: <T extends (typeof MATERIAL_TYPES)[number], C extends MaterialConfig[T]>(
      type: T,
      config: C
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
    [key in (typeof MATERIAL_TYPES)[number]]: (
      config: MaterialConfig[(typeof MATERIAL_TYPES)[number]]
    ) => MaterialConstructor[key];
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
  };

  return initialStore;
});
