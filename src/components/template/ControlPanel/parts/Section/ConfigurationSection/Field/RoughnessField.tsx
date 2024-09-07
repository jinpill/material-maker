import { Input } from "@jinpill/react-libs";
import Label from "./utils/Label";
import type { MeshPhysicalMaterialConfig, SetConfig } from "@/stores/useMaterialStore";

type RoughnessFieldProps = {
  config: MeshPhysicalMaterialConfig;
  setConfig: SetConfig;
};

const RoughnessField = (props: RoughnessFieldProps) => (
  <Label name="Roughness">
    <Input.Number
      size="small"
      step="0.1"
      decimal="3"
      min="0"
      max="1"
      value={props.config.roughness}
      onChange={(value) => {
        props.setConfig(props.config.type, {
          roughness: value,
        });
      }}
    />
  </Label>
);

export default RoughnessField;
