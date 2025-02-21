import { Route, Routes } from "react-router";
import ChangelogDetails from "./pages/ChangelogDetails";
import Changelogs from "./pages/Changelogs";
import { useEffect, useState } from "react";
import { ChangelogInterface } from "./utils/types";

function App() {
  const [changelogs, setChangelogs] = useState<ChangelogInterface[]>([]);
  const [config, setConfig] = useState({ tenantKey: "", url: "" });

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { type, data } = event.data;
      // listen for events from parent window
      if (type === "INIT") setConfig(data);
    };
    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  // get changelogs from Changelogs component
  const handleChangelogs = (changelogList: ChangelogInterface[]) => {
    setChangelogs(changelogList);
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Changelogs config={config} onDataChange={handleChangelogs} />
          }
        />
        <Route
          path="/changelogs/:id"
          element={<ChangelogDetails changelogs={changelogs} />}
        />
      </Routes>
    </>
  );
}

export default App;
