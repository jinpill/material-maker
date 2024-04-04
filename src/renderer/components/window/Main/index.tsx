import { useState, useEffect } from "react";
import WindowTitle from "@/components/ui/WindowTitle";
import * as ENV from "@/common/ENV";

const MainWindow = () => {
  const [version, setVersion] = useState<ENV.Version>();

  useEffect(() => {
    if (!window.env) return;
    setVersion(window.env.version);
  }, []);

  return (
    <>
      <WindowTitle name="Main" />

      <main>
        <h1>Main Window</h1>
        <h2>Versions</h2>
        <p>app: {version?.app}</p>
        <p>node.js: {version?.node}</p>
        <p>chrome: {version?.chrome}</p>
        <p>electron: {version?.electron}</p>
      </main>
    </>
  );
};

export default MainWindow;
