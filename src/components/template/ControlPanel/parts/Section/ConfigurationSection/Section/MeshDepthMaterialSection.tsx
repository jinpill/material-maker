import Field from "../Field";
import type { MeshDepthMaterialConfig, SetConfig } from "@/stores/useMaterialStore";

type MeshDepthMaterialSectionProps = {
  config: MeshDepthMaterialConfig;
  setConfig: SetConfig;
};

const MeshDepthMaterialSection = (props: MeshDepthMaterialSectionProps) => (
  <>
    <Field.Opacity config={props.config} setConfig={props.setConfig} />
    <Field.Transparent config={props.config} setConfig={props.setConfig} />
  </>
);

export default MeshDepthMaterialSection;
