import { Panel, Dropdown } from "@jinpill/react-libs";
import type { Option } from "@jinpill/react-libs/dist/components/Options";
import { useMaterialStore, MATERIAL_TYPES, MaterialType } from "@/stores/useMaterialStore";

const TYPE_OPTIONS: Option[] = MATERIAL_TYPES.map((type) => ({
  type: "option",
  value: type,
  label: type,
}));

const MaterialSection = () => {
  const { config, setConfig } = useMaterialStore();

  const handleChange = (type: string) => {
    setConfig(type as MaterialType, {});
  };

  return (
    <Panel.Section title="Material" isCollapsible isSpread>
      <Panel.Label name="Type" contentWidth="large">
        <Dropdown
          size="small"
          options={TYPE_OPTIONS}
          isFullWidth
          value={config.type}
          onChange={handleChange}
        />
      </Panel.Label>
    </Panel.Section>
  );
};

export default MaterialSection;
