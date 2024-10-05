import ColorField from "./ColorField";
import MetalnessField from "./MetalnessField";
import ClearcoatField from "./ClearcoatField";
import RoughnessField from "./RoughnessField";
import OpacityField from "./OpacityField";
import TransparentField from "./TransparentField";
import WireframeField from "./WireframeField";
import FlatShadingField from "./FlatShadingField";

const Field = {
  Color: ColorField,
  Metalness: MetalnessField,
  Clearcoat: ClearcoatField,
  Roughness: RoughnessField,
  Opacity: OpacityField,
  Transparent: TransparentField,
  Wireframe: WireframeField,
  FlatShading: FlatShadingField,
};

export default Field;
