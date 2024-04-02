import Stage from "./Stage";
import { TerrainProvider } from "./context/terrain";
import LeftPanel from "./layouts/left-panel";
import TopPanel from "./layouts/top-panel";

function App() {
  return (
    <TerrainProvider>
      <LeftPanel />
      <TopPanel />
      <Stage />
    </TerrainProvider>
  );
}

export default App;
