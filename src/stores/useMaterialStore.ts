import { useEffect, useMemo, useRef } from "react";
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
    opacity: 1,
    transparent: false,
  },
  MeshDepthMaterial: {
    type: "MeshDepthMaterial",
    opacity: 1,
    transparent: false,
  },
  MeshPhysicalMaterial: {
    type: "MeshPhysicalMaterial",
    color: "#000000",
    metalness: 0.5,
    clearcoat: 0.5,
    opacity: 1,
    transparent: false,
    flatShading: false,
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
  opacity: number;
  transparent: boolean;
};

export type MeshDepthMaterialConfig = {
  type: "MeshDepthMaterial";
  opacity: number;
  transparent: boolean;
};

export type MeshPhysicalMaterialConfig = {
  type: "MeshPhysicalMaterial";
  color: string;
  metalness: number;
  clearcoat: number;
  opacity: number;
  transparent: boolean;
  flatShading: boolean;
};

export const useMaterialStore = create<MaterialStore>((set, get) => {
  const initialStore: MaterialStore = {
    config: { ...DEFAULT_CONFIGS.MeshPhysicalMaterial },
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

        const newConfig: MaterialConfigMap[T] = {
          ...DEFAULT_CONFIGS[type],
        };

        Object.keys(state.config).forEach((key) => {
          if (key === "type") return;

          if (key in newConfig) {
            type NewConfigValue = (typeof newConfig)[keyof typeof newConfig];
            type NewConfigKey = keyof MaterialConfigMap[T];
            type OldConfigKey = keyof typeof state.config;

            const oldValue = state.config[key as OldConfigKey] as NewConfigValue;
            if (typeof newConfig[key as NewConfigKey] !== typeof oldValue) return;
            newConfig[key as NewConfigKey] = oldValue;
          }
        });

        return {
          config: {
            ...newConfig,
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
        opacity: _config.opacity,
        transparent: _config.transparent,
      });
    },
    MeshDepthMaterial: (config) => {
      const _config = config as MeshDepthMaterialConfig;
      return new THREE.MeshDepthMaterial({
        opacity: _config.opacity,
        transparent: _config.transparent,
      });
    },
    MeshPhysicalMaterial: (config) => {
      const _config = config as MeshPhysicalMaterialConfig;
      return new THREE.MeshPhysicalMaterial({
        color: _config.color,
        metalness: _config.metalness,
        clearcoat: _config.clearcoat,
        opacity: _config.opacity,
        transparent: _config.transparent,
        flatShading: _config.flatShading,
      });
    },
  };

  return initialStore;
});
