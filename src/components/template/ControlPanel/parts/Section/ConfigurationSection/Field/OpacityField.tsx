import { Input } from "@jinpill/react-libs";
import Label from "./utils/Label";
import type {
  MeshBasicMaterialConfig,
  MeshDepthMaterialConfig,
  MeshPhysicalMaterialConfig,
  SetConfig,
} from "@/stores/useMaterialStore";

type OpacityFieldProps = {
  config: MeshBasicMaterialConfig | MeshDepthMaterialConfig | MeshPhysicalMaterialConfig;
  setConfig: SetConfig;
};

const OpacityField = (props: OpacityFieldProps) => (
  <Label name="Opacity">
    <Input.Number
      size="small"
      step="0.1"
      decimal="3"
      min="0"
      max="1"
      value={props.config.opacity}
      onChange={(value) => {
        props.setConfig(props.config.type, {
          opacity: value,
        });
      }}
    />
  </Label>
);

export default OpacityField;
