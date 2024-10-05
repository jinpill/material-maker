import Field from "../Field";
import type { MeshPhysicalMaterialConfig, SetConfig } from "@/stores/useMaterialStore";

type MeshPhysicalMaterialSectionProps = {
  config: MeshPhysicalMaterialConfig;
  setConfig: SetConfig;
};

const MeshPhysicalMaterialSection = (props: MeshPhysicalMaterialSectionProps) => (
  <>
    <Field.Color config={props.config} setConfig={props.setConfig} />
    <Field.Metalness config={props.config} setConfig={props.setConfig} />
    <Field.Clearcoat config={props.config} setConfig={props.setConfig} />
    <Field.Roughness config={props.config} setConfig={props.setConfig} />
    <Field.Opacity config={props.config} setConfig={props.setConfig} />
    <Field.Transparent config={props.config} setConfig={props.setConfig} />
    <Field.Wireframe config={props.config} setConfig={props.setConfig} />
    <Field.FlatShading config={props.config} setConfig={props.setConfig} />
  </>
);

export default MeshPhysicalMaterialSection;
