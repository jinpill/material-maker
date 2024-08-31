import Field from "../Field";
import type { MeshPhysicalMaterialConfig, SetConfig } from "@/stores/useMaterialStore";

type MeshPhysicalMaterialSectionProps = {
  config: MeshPhysicalMaterialConfig;
  setConfig: SetConfig;
};

const MeshPhysicalMaterialSection = (props: MeshPhysicalMaterialSectionProps) => (
  <>
    <Field.Color config={props.config} setConfig={props.setConfig} />
  </>
);

export default MeshPhysicalMaterialSection;
