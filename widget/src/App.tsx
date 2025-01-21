import { Route, Routes } from "react-router";
import ChangelogDetails from "./pages/ChangelogDetails";
import Changelogs from "./pages/Changelogs";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Changelogs />} />
        <Route path="/:id" element={<ChangelogDetails />} />
      </Routes>
    </>
  );
}

export default App;
