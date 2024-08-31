import { Input } from "@jinpill/react-libs";
import Label from "./utils/Label";
import type {
  MeshBasicMaterialConfig,
  MeshPhysicalMaterialConfig,
  SetConfig,
} from "@/stores/useMaterialStore";

type ColorFieldProps = {
  config: MeshBasicMaterialConfig | MeshPhysicalMaterialConfig;
  setConfig: SetConfig;
};

const ColorField = (props: ColorFieldProps) => (
  <Label name="Color">
    <Input.Color
      size="small"
      value={props.config.color}
      onChange={(value) => {
        props.setConfig(props.config.type, {
          color: value,
        });
      }}
    />
  </Label>
);

export default ColorField;
