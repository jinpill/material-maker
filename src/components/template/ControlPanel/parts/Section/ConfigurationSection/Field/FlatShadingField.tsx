import { ToggleSwitch } from "@jinpill/react-libs";
import Label from "./utils/Label";
import type { MeshPhysicalMaterialConfig, SetConfig } from "@/stores/useMaterialStore";

type FlatShadingFieldProps = {
  config: MeshPhysicalMaterialConfig;
  setConfig: SetConfig;
};

const FlatShadingField = (props: FlatShadingFieldProps) => (
  <Label name="Flat shading">
    <ToggleSwitch
      size="small"
      value={props.config.flatShading}
      onChange={(value) => {
        props.setConfig(props.config.type, {
          flatShading: value,
        });
      }}
    />
  </Label>
);

export default FlatShadingField;
