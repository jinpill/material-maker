import { ToggleSwitch } from "@jinpill/react-libs";
import Label from "./utils/Label";
import type {
  MeshBasicMaterialConfig,
  MeshDepthMaterialConfig,
  MeshPhysicalMaterialConfig,
  SetConfig,
} from "@/stores/useMaterialStore";

type WireframeFieldProps = {
  config: MeshBasicMaterialConfig | MeshDepthMaterialConfig | MeshPhysicalMaterialConfig;
  setConfig: SetConfig;
};

const WireframeField = (props: WireframeFieldProps) => (
  <Label name="Wireframe">
    <ToggleSwitch
      size="small"
      value={props.config.wireframe}
      onChange={(value) => {
        props.setConfig(props.config.type, {
          wireframe: value,
        });
      }}
    />
  </Label>
);

export default WireframeField;
