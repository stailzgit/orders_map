import { useState } from "react";

const useResizable = () => {
  const [size, setSize] = useState({ width: "50vw", height: "100vh" });

  const onSizeChange = (d) => {
    const { width, height } = d;
    setSize((prev) => ({
      width: prev.width + width,
      height: prev.height + height,
    }));
  };

  return { onSizeChange, size };
};

export default useResizable;