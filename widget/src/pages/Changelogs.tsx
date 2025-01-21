import { Link } from "react-router";
import Footer from "../components/Footer";
import Fix from "../components/tags/Fix";
import New from "../components/tags/New";
import Update from "../components/tags/Update";

const changelogList = [
  {
    id: 1,
    title: "Lorem ipsum dolor",
    description:
      " Aliquam hac magna eu tincidunt. Interdum condimentum dui quis duis aliquet nunc diam. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae, quae natus, velit error voluptatum dolores hic ducimus fugit, nemo earum aut voluptatem? Est, quo distinctio quasi minus magni illum similique.",
    tags: ["update", "fix"],
  },
  {
    id: 2,
    title: "Lorem ipsum",
    description:
      " Vitae, quae natus, velit error voluptatum dolores hic ducimus fugit, nemo earum aut voluptatem? Est, quo distinctio quasi minus magni illum similique.",
    tags: ["fix"],
  },
  {
    id: 3,
    title: "Lorem ipsum dolor",
    description:
      " Interdum condimentum dui quis duis aliquet nunc diam. Vitae, quae natus, velit error voluptatum dolores hic ducimus fugit, nemo earum aut voluptatem? Est, quo distinctio quasi minus magni illum similique.",
    tags: ["new"],
  },
];

function Changelogs() {
  return (
    <>
      <div className="w-[30rem] border-0 rounded-md shadow-lg p-5">
        <div className="flex justify-center">
          <h3 className="text-blue-600 font-semibold">Recent changes</h3>
        </div>
        <div className="border-[0.5px] my-3"></div>
        {changelogList.map((changelog) => (
          <div className="h-20 pt-1 mb-4 cursor-pointer">
            <Link to={`/${changelog.id}`}>
              <div className="flex">
                {changelog.tags.includes("fix") && <Fix />}
                {changelog.tags.includes("update") && <Update />}
                {changelog.tags.includes("new") && <New />}
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
