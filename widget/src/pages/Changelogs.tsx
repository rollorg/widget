import { Link } from "react-router";
import Footer from "../components/Footer";
import Tag from "../components/Tag";
import { ChangelogInterface } from "../utils/types";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useEffect, useState } from "react";

function Changelogs({
  config,
  onDataChange,
}: {
  config: { tenantKey: string; url: string };
  onDataChange: (changelogs: ChangelogInterface[]) => void;
}) {
  const [changelogs, setChangelogs] = useState<ChangelogInterface[]>([]);
  const [metadata, setMetadata] = useState({});

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  // const testUrl = import.meta.env.VITE_API_TEST_URL;

  const postMessageToListeners = ({
    event,
    data,
  }: {
    event: string;
    data?: object;
  }) => {
    if (window.parent) {
      window.parent.postMessage({ type: event, data }, config.url);
    }
  };
  // close application handler
  const handleCloseIframe = () => postMessageToListeners({ event: "CLOSE" });

  // execute callback function 'handleChangelogs' from 'App' component
  // to set the list of changelogs at the parent level to avoid multiple API calls
  useEffect(() => {
    const sendChangeLogsToParent = () => {
      if (changelogs.length > 0) {
        onDataChange(changelogs);
      }
    };
    sendChangeLogsToParent();
  }, [changelogs, onDataChange]);

  // fetch changelogs by tenant key from the API endpoint
  // via the route '<API_BASE_URL>/organisation/<tenantKey>'
  useEffect(() => {
    const fetchChangelogs = async () => {
      // fetch changelogs by tenantKey
      try {
        const res = await fetch(
          `${apiUrl}/changelog/organisation/key/${config?.tenantKey}`
        );
        // const res = await fetch(`${testUrl}`);
        if (!res.ok) {
          throw new Error(`Response status: ${res.status}`);
        }

        const data = await res.json();
        setChangelogs(data.changelogs); // set changelogs
        setMetadata(data.metadata); // set pagination metadata
      } catch (error) {
        if (error instanceof Error) {
          console.log(`Error message: ${error.message}`);
        } else {
          console.log(`Error: ${error}`);
        }
      }
    };
    fetchChangelogs();
  }, [apiUrl, config]);

  // log pagination metadata to the console
  console.log("metadata", metadata);

  if (changelogs.length === 0) {
    return (
      <div className="text-bold flex justify-center items-center">
        <h3>Loading•••</h3>
      </div>
    );
  }

  return (
    <div className="flex flex-col border-0 min-h-screen rounded-md shadow-lg p-5 md:w-[30rem]">
      <div className="flex-1">
        <div className="flex justify-between">
          <div>
            <CloseOutlinedIcon
              style={{
                fontSize: "large",
                marginLeft: "5px",
                cursor: "pointer",
              }}
              onClick={handleCloseIframe}
            />
          </div>
          <div className="mr-28 md:mr-40">
            <h3 className="text-blue-600 font-semibold">Recent changes</h3>
          </div>
        </div>
        <div className="border-[0.5px] my-3"></div>
        {changelogs.map((changelog) => (
          <div key={changelog._id} className="h-full pt-1 mb-4 cursor-pointer">
            <Link to={`/changelogs/${changelog._id}`}>
              <div className="flex">
                {changelog.categories.some(
                  (category) => category.name === "fix"
                ) ? (
                  <Tag
                    name="Fix"
                    className="text-xs text-gray-100 bg-green-600 w-auto py-2 px-4 mr-2 rounded-l-full flex justify-center items-center rounded-tr-[15000px]"
                  />
                ) : null}
                {changelog.categories.some(
                  (category) => category.name === "update"
                ) ? (
                  <Tag
                    name="Update"
                    className="text-xs text-gray-100 bg-red-600 w-auto py-2 px-4 mr-2 rounded-l-full flex justify-center items-center rounded-br-[15000px]"
                  />
                ) : null}
                {changelog.categories.some(
                  (category) => category.name === "new"
                ) ? (
                  <Tag
                    name="New"
                    className="text-xs text-gray-100 bg-yellow-500 w-auto py-2 px-4 mr-2 rounded-l-full flex justify-center items-center rounded-tr-[15000px]"
                  />
                ) : null}
                <h4 className="text-gray-800 text-sm mt-2 font-[500]">
                  {changelog.title}
                </h4>
              </div>
              <div className="text-gray-500 text-sm my-2 line-clamp-2">
                <p>{changelog.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="border-[0.5px] my-2  bottom-0"></div>
      <Footer />
    </div>
  );
}

export default Changelogs;
