import { Panel } from "@jinpill/react-libs";
import style from "./style.module.scss";

const ControlPanel = () => {
  return (
    <Panel.Container className={style.controlPanel}>
      <Panel.Header title="Control Panel" />

      <Panel.Contents>
        <Panel.Section title="Material" isCollapsible></Panel.Section>
        <Panel.Section title="Material" isCollapsible></Panel.Section>
      </Panel.Contents>
    </Panel.Container>
  );
};

export default ControlPanel;
