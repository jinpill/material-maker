import * as THREE from "three";
import { Panel, Dropdown, Input } from "@jinpill/react-libs";
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
  const { preset, intensity, rotation, setPreset, setIntensity, setRotation } =
    useEnvironmentStore();

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

      <Panel.Label name="Intensity" contentWidth="large">
        <Input.Number
          size="small"
          step="0.1"
          decimal="3"
          min="0"
          max="1"
          value={intensity}
          onChange={setIntensity}
        />
      </Panel.Label>

      <Panel.Label name="Rotation X" contentWidth="large">
        <Input.Number
          size="small"
          step="10"
          decimal="3"
          min="-360"
          max="360"
          value={THREE.MathUtils.radToDeg(rotation.x)}
          onChange={(value) => {
            setRotation("x", THREE.MathUtils.degToRad(value));
          }}
        />
      </Panel.Label>
      <Panel.Label name="Rotation Y" contentWidth="large">
        <Input.Number
          size="small"
          step="10"
          decimal="3"
          min="-360"
          max="360"
          value={THREE.MathUtils.radToDeg(rotation.y)}
          onChange={(value) => {
            setRotation("y", THREE.MathUtils.degToRad(value));
          }}
        />
      </Panel.Label>
      <Panel.Label name="Rotation Z" contentWidth="large">
        <Input.Number
          size="small"
          step="10"
          decimal="3"
          min="-360"
          max="360"
          value={THREE.MathUtils.radToDeg(rotation.z)}
          onChange={(value) => {
            setRotation("z", THREE.MathUtils.degToRad(value));
          }}
        />
      </Panel.Label>
    </Panel.Section>
  );
};

export default EnvironmentSection;
