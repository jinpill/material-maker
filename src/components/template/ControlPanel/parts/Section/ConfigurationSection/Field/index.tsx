import ColorField from "./ColorField";
import MetalnessField from "./MetalnessField";
import ClearcoatField from "./ClearcoatField";
import OpacityField from "./OpacityField";
import TransparentField from "./TransparentField";
import FlatShadingField from "./FlatShadingField";

const Field = {
  Color: ColorField,
  Metalness: MetalnessField,
  Clearcoat: ClearcoatField,
  Opacity: OpacityField,
  Transparent: TransparentField,
  FlatShading: FlatShadingField,
};

export default Field;
