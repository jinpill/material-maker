import Field from "../Field";
import type { MeshBasicMaterialConfig, SetConfig } from "@/stores/useMaterialStore";

type MeshBasicMaterialSectionProps = {
  config: MeshBasicMaterialConfig;
  setConfig: SetConfig;
};

const MeshBasicMaterialSection = (props: MeshBasicMaterialSectionProps) => (
  <>
    <Field.Color config={props.config} setConfig={props.setConfig} />
    <Field.Opacity config={props.config} setConfig={props.setConfig} />
    <Field.Transparent config={props.config} setConfig={props.setConfig} />
  </>
);

export default MeshBasicMaterialSection;
