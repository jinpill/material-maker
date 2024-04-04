import { useState, useEffect, useMemo } from "react";
import * as ENV from "@/common/ENV";

const useTitle = (name: string) => {
  const [productName, setProductName] = useState("");
  const [mode, setMode] = useState<ENV.Mode>("packaged");
  const [stage, setStage] = useState<ENV.Stage>("stable");

  const title = useMemo(() => {
    if (mode === "development") {
      return `${productName} dev - ${name}`;
    } else if (stage !== "stable") {
      return `${productName} ${stage} - ${name}`;
    } else {
      return `${productName} - ${name}`;
    }
  }, [name, productName, mode, stage]);

  useEffect(() => {
    if (!window.env || !window.appConfig) return;

    setProductName(window.appConfig.productName);
    setMode(window.env.mode);
    setStage(window.env.stage);
  }, []);

  return title;
};

export default useTitle;
