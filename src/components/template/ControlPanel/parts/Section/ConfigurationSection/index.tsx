import { Panel } from "@jinpill/react-libs";
import Section from "./Section";
import { useMaterialStore } from "@/stores/useMaterialStore";

const ConfigurationSection = () => {
  const { config, setConfig } = useMaterialStore();

  return (
    <Panel.Section title="Configuration" isCollapsible isSpread>
      {config.type === "MeshBasicMaterial" && (
        <Section.MeshBasicMaterial config={config} setConfig={setConfig} />
      )}
      {config.type === "MeshPhysicalMaterial" && (
        <Section.MeshPhysicalMaterial config={config} setConfig={setConfig} />
      )}
    </Panel.Section>
  );
};

export default ConfigurationSection;
