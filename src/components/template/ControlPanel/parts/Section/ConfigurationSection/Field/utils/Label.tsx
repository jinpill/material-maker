import { Panel } from "@jinpill/react-libs";

type LabelProps = {
  name: string;
  children?: React.ReactNode;
};

const Label = (props: LabelProps) => (
  <Panel.Label name={props.name} contentWidth="large">
    {props.children}
  </Panel.Label>
);

export default Label;
