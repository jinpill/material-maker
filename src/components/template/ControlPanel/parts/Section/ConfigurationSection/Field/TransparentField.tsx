import { ToggleSwitch } from "@jinpill/react-libs";
import Label from "./utils/Label";
import type {
  MeshBasicMaterialConfig,
  MeshDepthMaterialConfig,
  MeshPhysicalMaterialConfig,
  SetConfig,
} from "@/stores/useMaterialStore";

type TransparentFieldProps = {
  config: MeshBasicMaterialConfig | MeshDepthMaterialConfig | MeshPhysicalMaterialConfig;
  setConfig: SetConfig;
};

const TransparentField = (props: TransparentFieldProps) => (
  <Label name="Transparent">
    <ToggleSwitch
      size="small"
      value={props.config.transparent}
      onChange={(value) => {
        props.setConfig(props.config.type, {
          transparent: value,
        });
      }}
    />
  </Label>
);

export default TransparentField;
