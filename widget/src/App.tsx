import { Route, Routes } from "react-router";
import ChangelogDetails from "./pages/ChangelogDetails";
import Changelogs from "./pages/Changelogs";
import { useEffect, useState } from "react";
import { ChangelogInterface } from "./utils/types";

function App() {
  const [changelogs, setChangelogs] = useState<ChangelogInterface[]>([]);
  const [config, setConfig] = useState('');

  // const url = import.meta.env.VITE_API_BASE_URL;
  const testUrl = import.meta.env.VITE_API_TEST_URL;

  const postMessageToListeners = ({
    event,
    data,
  }: {
    event: string;
    data?: object;
  }) => {
    if (window.parent) {
      window.parent.postMessage({ type: event, data }, "*");
    }
  };

  // close application handler
  // const handleClose = () => postMessageToListeners({ event: "close" });

  useEffect(() => {
    // listen for tenantKey from parent window
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "CHANGELOGS_TENANT_KEY") {
        // setConfig(event.data.config?.tenantKey);
      }
    };
    // should be removed when tenantKey is passed from parent window
    setConfig("new_org_fyevB");

    // notify parent window that widget is ready
    postMessageToListeners({ event: "WIDGET_READY" });
    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    const fetchChangelogs = async () => {
      // fetch changelogs by tenantKey
      try {
        // const res = await fetch(`${url}/organisation/${config}`);
        const res = await fetch(`${testUrl}`);
        if (!res.ok) {
          throw new Error(`Response status: ${res.status}`);
        }
        const data = await res.json();        
        setChangelogs(data);
        // setChangelogs(data.filter((changelog: ChangelogInterface) => changelog.tenantKey === config));
      } catch (error) {
        if (error instanceof Error) {
          console.log(`Error message: ${error.message}`);
        } else {
          console.log(`Error: ${error}`);
        }
      }
    };
    fetchChangelogs();
  }, [testUrl, config]);  

  return (
    <>
      <Routes>
        <Route
          path="/changelogs"
          element={<Changelogs changelogs={changelogs} />}
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
