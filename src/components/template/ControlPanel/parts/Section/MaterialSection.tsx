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

  return (
    <Panel.Section title="Material" isCollapsible isSpread>
      <Panel.Label name="Type" contentWidth="large">
        <Dropdown
          size="small"
          options={TYPE_OPTIONS}
          isFullWidth
          value={config.type}
          onChange={(type) => {
            setConfig(type as MaterialType);
          }}
        />
      </Panel.Label>
    </Panel.Section>
  );
};

export default MaterialSection;
