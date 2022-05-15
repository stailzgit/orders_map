import { Resizable } from "re-resizable";
import { useState } from "react";
import "./style/_root.css";
import { MapComponent } from "./components/MapComponent";
import TableOrders from "./components/TableOrders";
import useResizable from "./hooks/useResizable";

function App() {
  const { size, onSizeChange } = useResizable();

  const [way, setWay] = useState([
    { lat: 41.505, lng: -0.08 },
    { lat: 51.505, lng: -0.09 },
  ]);

  return (
    <div className="app">
      <Resizable
        className="resize-box"
        enable={{ right: true }}
        size={{ width: size.width, height: size.height }}
        onResizeStop={(d) => onSizeChange(d)}
      >
        <TableOrders way={way} setWay={setWay} />
      </Resizable>

      <MapComponent way={way} sizeTable={size} />
    </div>
  );
}

export default App;
