import { create } from "zustand";
import * as THREE from "three";

new THREE.MeshBasicMaterial({});

export type BasicMaterialConfig = {
  type: "MeshBasicMaterial";
  color: THREE.ColorRepresentation;
};

export type StandardMaterialConfig = {
  type: "MeshStandardMaterial";
  color: THREE.ColorRepresentation;
};

export type PhongMaterialConfig = {
  type: "MeshPhongMaterial";
  color: THREE.ColorRepresentation;
};

export type LambertMaterialConfig = {
  type: "MeshLambertMaterial";
  color: THREE.ColorRepresentation;
};

export type PhysicalMaterialConfig = {
  type: "MeshPhysicalMaterial";
  color: THREE.ColorRepresentation;
};

export type ToonMaterialConfig = {
  type: "MeshToonMaterial";
  color: THREE.ColorRepresentation;
};

export type DepthMaterialConfig = {
  type: "MeshDepthMaterial";
};

export type NormalMaterialConfig = {
  type: "MeshNormalMaterial";
};

export type MaterialConfig =
  | BasicMaterialConfig
  | StandardMaterialConfig
  | PhongMaterialConfig
  | LambertMaterialConfig
  | PhysicalMaterialConfig
  | ToonMaterialConfig
  | DepthMaterialConfig
  | NormalMaterialConfig;

type MaterialState = {
  config: MaterialConfig;
};

const useMaterialStore = create<MaterialState>((set) => ({
  config: {
    type: "MeshPhongMaterial",
    color: "eeeeee",
  },
}));

export default useMaterialStore;
