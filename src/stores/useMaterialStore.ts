import { useEffect, useState } from "react";
import { create } from "zustand";
import * as THREE from "three";

export type MaterialStoreState = {
  config: MeshMaterialConfig;
};

export type MaterialStoreActions = {
  setConfig: <T extends MaterialType, C extends ConfigMap[T]>(type: T, config?: C) => void;
  useMaterial: () => MeshMaterial;
};

export const useMaterialStore = create<MaterialStoreState & MaterialStoreActions>((set, get) => {
  const setMeshMatcapMaterialConfig = (config?: Partial<MeshMatcapMaterialConfig>) => {
    set((state) => {
      if (state.config.type === "MeshMatcapMaterial") {
        return {
          ...state.config,
          ...config,
        };
      }

      const newConfig: MeshMatcapMaterialConfig = {
        type: "MeshMatcapMaterial",
        ...config,
      };

      return {
        config: newConfig,
      };
    });
  };

  const setMeshToonMaterialConfig = (config?: Partial<MeshToonMaterialConfig>) => {
    set((state) => {
      if (state.config.type === "MeshToonMaterial") {
        return {
          ...state.config,
          ...config,
        };
      }

      const newConfig: MeshToonMaterialConfig = {
        type: "MeshToonMaterial",
        ...config,
      };

      return {
        config: newConfig,
      };
    });
  };

  const setMeshBasicMaterialConfig = (config?: Partial<MeshBasicMaterialConfig>) => {
    set((state) => {
      if (state.config.type === "MeshBasicMaterial") {
        return {
          ...state.config,
          ...config,
        };
      }

      const newConfig: MeshBasicMaterialConfig = {
        type: "MeshBasicMaterial",
        ...config,
      };

      return {
        config: newConfig,
      };
    });
  };

  const setMeshDepthMaterialConfig = (config?: Partial<MeshDepthMaterialConfig>) => {
    set((state) => {
      if (state.config.type === "MeshDepthMaterial") {
        return {
          ...state.config,
          ...config,
        };
      }

      const newConfig: MeshDepthMaterialConfig = {
        type: "MeshDepthMaterial",
        ...config,
      };

      return {
        config: newConfig,
      };
    });
  };

  const setMeshPhongMaterialConfig = (config?: Partial<MeshPhongMaterialConfig>) => {
    set((state) => {
      if (state.config.type === "MeshPhongMaterial") {
        return {
          ...state.config,
          ...config,
        };
      }

      const newConfig: MeshPhongMaterialConfig = {
        type: "MeshPhongMaterial",
        ...config,
      };

      return {
        config: newConfig,
      };
    });
  };

  const setMeshNormalMaterialConfig = (config?: Partial<MeshNormalMaterialConfig>) => {
    set((state) => {
      if (state.config.type === "MeshNormalMaterial") {
        return {
          ...state.config,
          ...config,
        };
      }

      const newConfig: MeshNormalMaterialConfig = {
        type: "MeshNormalMaterial",
        ...config,
      };

      return {
        config: newConfig,
      };
    });
  };

  const setMeshLambertMaterialConfig = (config?: Partial<MeshLambertMaterialConfig>) => {
    set((state) => {
      if (state.config.type === "MeshLambertMaterial") {
        return {
          ...state.config,
          ...config,
        };
      }

      const newConfig: MeshLambertMaterialConfig = {
        type: "MeshLambertMaterial",
        ...config,
      };

      return {
        config: newConfig,
      };
    });
  };

  const setMeshDistanceMaterialConfig = (config?: Partial<MeshDistanceMaterialConfig>) => {
    set((state) => {
      if (state.config.type === "MeshDistanceMaterial") {
        return {
          ...state.config,
          ...config,
        };
      }

      const newConfig: MeshDistanceMaterialConfig = {
        type: "MeshDistanceMaterial",
        ...config,
      };

      return {
        config: newConfig,
      };
    });
  };

  const setMeshPhysicalMaterialConfig = (config?: Partial<MeshPhysicalMaterialConfig>) => {
    set((state) => {
      if (state.config.type === "MeshPhysicalMaterial") {
        return {
          ...state.config,
          ...config,
        };
      }

      const newConfig: MeshPhysicalMaterialConfig = {
        type: "MeshPhysicalMaterial",
        ...config,
      };

      return {
        config: newConfig,
      };
    });
  };

  const setMeshStandardMaterialConfig = (config?: Partial<MeshStandardMaterialConfig>) => {
    set((state) => {
      if (state.config.type === "MeshStandardMaterial") {
        return {
          ...state.config,
          ...config,
        };
      }

      const newConfig: MeshStandardMaterialConfig = {
        type: "MeshStandardMaterial",
        ...config,
      };

      return {
        config: newConfig,
      };
    });
  };

  return {
    config: {
      type: "MeshPhysicalMaterial",
    },
    setConfig: (type, config) => {
      switch (type) {
        case "MeshMatcapMaterial":
          setMeshMatcapMaterialConfig(config as MeshMatcapMaterialConfig);
          break;
        case "MeshToonMaterial":
          setMeshToonMaterialConfig(config as MeshToonMaterialConfig);
          break;
        case "MeshBasicMaterial":
          setMeshBasicMaterialConfig(config as MeshBasicMaterialConfig);
          break;
        case "MeshDepthMaterial":
          setMeshDepthMaterialConfig(config as MeshDepthMaterialConfig);
          break;
        case "MeshPhongMaterial":
          setMeshPhongMaterialConfig(config as MeshPhongMaterialConfig);
          break;
        case "MeshNormalMaterial":
          setMeshNormalMaterialConfig(config as MeshNormalMaterialConfig);
          break;
        case "MeshLambertMaterial":
          setMeshLambertMaterialConfig(config as MeshLambertMaterialConfig);
          break;
        case "MeshDistanceMaterial":
          setMeshDistanceMaterialConfig(config as MeshDistanceMaterialConfig);
          break;
        case "MeshPhysicalMaterial":
          setMeshPhysicalMaterialConfig(config as MeshPhysicalMaterialConfig);
          break;
        case "MeshStandardMaterial":
          setMeshStandardMaterialConfig(config as MeshStandardMaterialConfig);
          break;
      }
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
  };
});

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

type ConfigMap = {
  MeshMatcapMaterial: MeshMatcapMaterialConfig;
  MeshToonMaterial: MeshToonMaterialConfig;
  MeshBasicMaterial: MeshBasicMaterialConfig;
  MeshDepthMaterial: MeshDepthMaterialConfig;
  MeshPhongMaterial: MeshPhongMaterialConfig;
  MeshNormalMaterial: MeshNormalMaterialConfig;
  MeshLambertMaterial: MeshLambertMaterialConfig;
  MeshDistanceMaterial: MeshDistanceMaterialConfig;
  MeshPhysicalMaterial: MeshPhysicalMaterialConfig;
  MeshStandardMaterial: MeshStandardMaterialConfig;
};

export type MaterialType = keyof ConfigMap;

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

export const MATERIAL_TYPES = [
  "MeshMatcapMaterial",
  "MeshToonMaterial",
  "MeshBasicMaterial",
  "MeshDepthMaterial",
  "MeshPhongMaterial",
  "MeshNormalMaterial",
  "MeshLambertMaterial",
  // "MeshDistanceMaterial",
  "MeshPhysicalMaterial",
  "MeshStandardMaterial",
] as const;

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
