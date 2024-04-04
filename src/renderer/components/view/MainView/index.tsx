import ThreeJsView from "@/components/view/ThreeJsView";
import Controls from "@/components/view/Controls";
import AxesHelper from "@/components/view/AxesHelper";
import Models from "@/components/view/Models";

const MainView = () => {
  return (
    <ThreeJsView>
      <Controls />
      <AxesHelper />
      <Models />
    </ThreeJsView>
  );
};

export default MainView;
