import React from "react";
import { Player } from "../../game/Player";
import { Shield } from "lucide-react";
import "../../../styles/ItemBrowser.scss"; 
interface Props {
    stats: Player["stats"];
    setPlayerStats: React.Dispatch<React.SetStateAction<Player["stats"]>>;
}

export const PlayerStatsPanel: React.FC<Props> = ({ stats : playerStats, setPlayerStats }) => {
    return (
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Player Stats
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                    <label className="text-green-400 text-sm">STR</label>
                    <input
                        type="number"
                        value={playerStats.str}
                        onChange={(e) =>
                            setPlayerStats({
                                ...playerStats,
                                str: parseInt(e.target.value) || 0,
                            })
                        }
                        className="w-full bg-gray-700 text-white p-2 rounded mt-1"
                        min="0"
                        max="99"
                    />
                </div>
                <div>
                    <label className="text-yellow-400 text-sm">DEX</label>
                    <input
                        type="number"
                        value={playerStats.dex}
                        onChange={(e) =>
                            setPlayerStats({
                                ...playerStats,
                                dex: parseInt(e.target.value) || 0,
                            })
                        }
                        className="w-full bg-gray-700 text-white p-2 rounded mt-1"
                        min="0"
                        max="99"
                    />
                </div>
                <div>
                    <label className="text-blue-400 text-sm">INT</label>
                    <input
                        type="number"
                        value={playerStats.int}
                        onChange={(e) =>
                            setPlayerStats({
                                ...playerStats,
                                int: parseInt(e.target.value) || 0,
                            })
                        }
                        className="w-full bg-gray-700 text-white p-2 rounded mt-1"
                        min="0"
                        max="99"
                    />
                </div>
                <div>
                    <label className="text-purple-400 text-sm">FAI</label>
                    <input
                        type="number"
                        value={playerStats.fai}
                        onChange={(e) =>
                            setPlayerStats({
                                ...playerStats,
                                fai: parseInt(e.target.value) || 0,
                            })
                        }
                        className="w-full bg-gray-700 text-white p-2 rounded mt-1"
                        min="0"
                        max="99"
                    />
                </div>
            </div>
        </div>
    );
};
