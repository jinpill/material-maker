import { Input } from "@jinpill/react-libs";
import Label from "./utils/Label";
import type { MeshPhysicalMaterialConfig, SetConfig } from "@/stores/useMaterialStore";

type MetalnessFieldProps = {
  config: MeshPhysicalMaterialConfig;
  setConfig: SetConfig;
};

const MetalnessField = (props: MetalnessFieldProps) => (
  <Label name="Metalness">
    <Input.Number
      size="small"
      value={props.config.metalness}
      onChange={(value) => {
        props.setConfig(props.config.type, {
          metalness: value,
        });
      }}
    />
  </Label>
);

export default MetalnessField;
