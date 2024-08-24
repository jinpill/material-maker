import { Panel } from "@jinpill/react-libs";
import Section from "./parts/Section";
import style from "./style.module.scss";

const ControlPanel = () => (
  <Panel.Container className={style.controlPanel}>
    <Panel.Header title="Control Panel" />

    <Panel.Contents>
      <Section.Environment />
      <Section.Material />
      <Section.Configuration />
    </Panel.Contents>
  </Panel.Container>
);

export default ControlPanel;
