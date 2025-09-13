import React from "react";
import { Player } from "../../game/Player";
import { Shield } from "lucide-react";
import "../../../styles/ItemBrowser.scss";
interface Props {
  stats: Player["stats"];
}

export const PlayerStatsPanel: React.FC<Props> = ({ stats: playerStats }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-6">
      <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
        <Shield className="w-4 h-4" />
        Player Stats
      </h3>
      <div className="stats-grid">
        {Object.entries(playerStats).map(([key, stat]) => (
          <div className="stat-item" key={key}>
            <p>
              {key.toUpperCase()}: {stat}
            </p>
            <button>+</button>
            <button>-</button>
          </div>
        ))}
      </div>
    </div>
  );
};
