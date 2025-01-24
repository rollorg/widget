import { Link } from "react-router";
import Footer from "../components/Footer";
import { changelogList } from "../assets/data";
import Tag from "../components/Tag";

function Changelogs() {
  return (
    <>
      <div className="w-[30rem] border-0 rounded-md shadow-lg p-5">
        <div className="flex justify-center">
          <h3 className="text-blue-600 font-semibold">Recent changes</h3>
        </div>
        <div className="border-[0.5px] my-3"></div>
        {changelogList.map((changelog) => (
          <div key={changelog.id} className="h-20 pt-1 mb-4 cursor-pointer">
            <Link to={`/${changelog.id}`}>
              <div className="flex">
                {changelog.tags.includes("fix") && (
                  <Tag
                    name="Fix"
                    className="text-xs text-gray-100 bg-green-600 w-auto py-2 px-4 mr-2 rounded-l-full flex justify-center items-center rounded-tr-[15000px]"
                  />
                )}
                {changelog.tags.includes("update") && (
                  <Tag
                    name="Update"
                    className="text-xs text-gray-100 bg-red-600 w-auto py-2 px-4 mr-2 rounded-l-full flex justify-center items-center rounded-br-[15000px]"
                  />
                )}
                {changelog.tags.includes("new") && (
                  <Tag
                    name="New"
                    className="text-xs text-gray-100 bg-yellow-500 w-auto py-2 px-4 mr-2 rounded-l-full flex justify-center items-center rounded-tr-[15000px]"
                  />
                )}
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
        <div className="border-[0.5px] my-2"></div>
        <Footer />
      </div>
    </>
  );
}

export default Changelogs;
