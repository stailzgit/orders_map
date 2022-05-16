import { Resizable } from "re-resizable";
import { useState } from "react";
import "./style/_root.css";
import { MapComponent } from "./components/MapComponent";
import TableOrders from "./components/TableOrders";
import useResizable from "./hooks/useResizable";

function App() {
  const { size, onSizeChange } = useResizable();

  return (
    <div className="app">
      <Resizable
        className="resize-box"
        enable={{ right: true }}
        size={{ width: size.width, height: size.height }}
        onResizeStop={(d) => onSizeChange(d)}
      >
        <TableOrders />
      </Resizable>

      <MapComponent sizeTable={size} />
    </div>
  );
}

export default App;
