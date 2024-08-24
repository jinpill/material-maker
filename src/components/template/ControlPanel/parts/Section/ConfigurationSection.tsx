import { useMaterialStore } from "@/stores/useMaterialStore";
import { Input, Panel } from "@jinpill/react-libs";

const ConfigurationSection = () => {
  const { config, setConfig } = useMaterialStore();

  return (
    <Panel.Section title="Configuration" isCollapsible isSpread>
      {"color" in config && (
        <Panel.Label name="Color" contentWidth="large">
          <Input.Color
            size="small"
            value={config.color as string}
            onChange={(value) => {
              setConfig(config.type, {
                color: value,
              });
            }}
          />
        </Panel.Label>
      )}
    </Panel.Section>
  );
};

export default ConfigurationSection;
