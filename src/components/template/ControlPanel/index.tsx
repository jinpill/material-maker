import { Panel, Dropdown } from "@jinpill/react-libs";
import type { Option } from "@jinpill/react-libs/dist/components/Options";
import { useMaterialStore, MATERIAL_TYPES, MaterialType } from "@/stores/useMaterialStore";
import style from "./style.module.scss";

const TYPE_OPTIONS: Option[] = MATERIAL_TYPES.map((type) => ({
  type: "option",
  value: type,
  label: type,
}));

const ControlPanel = () => {
  const { config, setConfig } = useMaterialStore();

  return (
    <Panel.Container className={style.controlPanel}>
      <Panel.Header title="Control Panel" />

      <Panel.Contents>
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
        <Panel.Section title="Material" isCollapsible></Panel.Section>
      </Panel.Contents>
    </Panel.Container>
  );
};

export default ControlPanel;
