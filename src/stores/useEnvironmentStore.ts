import { create } from "zustand";
import { EnvironmentProps } from "@react-three/drei";

export type EnvironmentPreset = NonNullable<EnvironmentProps["preset"]> | "none";

export type EnvironmentStoreState = {
  preset: EnvironmentPreset;
};

export type EnvironmentStoreActions = {
  setPreset: (preset: EnvironmentPreset) => void;
};

export const useEnvironmentStore = create<EnvironmentStoreState & EnvironmentStoreActions>(
  (set) => ({
    preset: "none",
    setPreset: (preset: EnvironmentPreset) => set({ preset }),
  })
);

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
