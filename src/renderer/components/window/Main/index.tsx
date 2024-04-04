import WindowTitle from "@/components/ui/WindowTitle";
import MainView from "@/components/view/MainView";
import style from "./style.module.scss";

const MainWindow = () => {
  return (
    <>
      <WindowTitle name="Main" />
      <main className={style.main}>
        <MainView />
      </main>
    </>
  );
};

export default MainWindow;
