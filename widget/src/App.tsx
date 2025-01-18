import Changelog from "./components/Changelog";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="w-[30rem] border-0 rounded-md shadow-lg p-5">
      <div className="flex justify-center">
        <h3 className="text-blue-600 font-semibold">Recent changes</h3>
      </div>
      <div className="border-[0.5px] my-3"></div>
      <Changelog />
      <div className="border-[0.5px] my-2"></div>
      <Footer />
    </div>
  );
}

export default App;
