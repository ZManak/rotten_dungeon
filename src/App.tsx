import React from "react";
import "./styles/ItemBrowser.scss";

import { GAME_WEAPONS } from "./constants/game/weapons_db";
import { ItemBrowser } from "./components/layout/ItemBrowser/ItemBrowser";

function App() {
  return (
    <div className="flex flex-row flex-wrap gap-4 p-10">
      <ItemBrowser items={Object.values(GAME_WEAPONS)} />
    </div>
  );
}

export default App;
