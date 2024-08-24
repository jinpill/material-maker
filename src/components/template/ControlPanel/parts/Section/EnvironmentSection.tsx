import { Panel, Dropdown } from "@jinpill/react-libs";
import type { Option } from "@jinpill/react-libs/dist/components/Options";
import {
  useEnvironmentStore,
  ENVIRONMENT_PRESETS,
  EnvironmentPreset,
} from "@/stores/useEnvironmentStore";

const PRESET_OPTIONS: Option[] = ENVIRONMENT_PRESETS.map((preset) => ({
  type: "option",
  value: preset,
  label: preset,
}));

const EnvironmentSection = () => {
  const { preset, setPreset } = useEnvironmentStore();

  return (
    <Panel.Section title="Environment" isCollapsible isSpread>
      <Panel.Label name="Preset" contentWidth="large">
        <Dropdown
          size="small"
          options={PRESET_OPTIONS}
          isFullWidth
          value={preset}
          onChange={(preset) => {
            setPreset(preset as EnvironmentPreset);
          }}
        />
      </Panel.Label>
    </Panel.Section>
  );
};

export default EnvironmentSection;
