import React from "react";
import { useQuery } from "@apollo/client";
import "./styles/ItemBrowser.scss";

import { GET_WEAPONS } from "./services/queries";
import { ItemBrowser } from "./components/layout/ItemBrowser/ItemBrowser";

function App() {
  const { loading, error, data } = useQuery(GET_WEAPONS);

  if (loading) return <div className="flex items-center justify-center min-h-screen text-white">Loading weapons...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-400">Error: {error.message}</div>;

  return (
    <div className="flex flex-row flex-wrap gap-4 p-10">
      <ItemBrowser items={data?.weapons || []} />
    </div>
  );
}

export default App;
