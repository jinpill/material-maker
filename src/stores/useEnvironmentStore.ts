import { create } from "zustand";
import * as THREE from "three";
import { EnvironmentProps } from "@react-three/drei";

export type EnvironmentPreset = NonNullable<EnvironmentProps["preset"]> | "none";

export type EnvironmentStore = {
  preset: EnvironmentPreset;
  setPreset: (preset: EnvironmentPreset) => void;
  intensity: number;
  setIntensity: (intensity: number) => void;
  rotation: THREE.Euler;
  setRotation: (axis: "x" | "y" | "z", angle: number) => void;
};

export const useEnvironmentStore = create<EnvironmentStore>((set) => ({
  preset: "none",
  setPreset: (preset: EnvironmentPreset) => set({ preset }),
  intensity: 1,
  setIntensity: (intensity: number) => set({ intensity }),
  rotation: new THREE.Euler(0, 0, 0),
  setRotation: (axis, angle) => {
    set((state) => {
      const rotation = state.rotation.clone();
      rotation[axis] = angle;
      return { rotation };
    });
  },
}));

export const ENVIRONMENT_PRESETS: EnvironmentPreset[] = [
  "none",
  "apartment",
  "city",
  "dawn",
  "forest",
  "lobby",
  "night",
  "park",
  "studio",
  "sunset",
  "warehouse",
];
