import { Input, Panel } from "@jinpill/react-libs";
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
  <Panel.Label name="Color" contentWidth="large">
    <Input.Color
      size="small"
      value={props.config.color}
      onChange={(value) => {
        props.setConfig(props.config.type, {
          color: value,
        });
      }}
    />
  </Panel.Label>
);

export default ColorField;
