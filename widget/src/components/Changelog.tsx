import Fix from "./tags/Fix";
import New from "./tags/New";
import Update from "./tags/Update";

function Changelog() {
  return (
    <div className="h-20 pt-1 mb-4">
        <div className="flex">
          <Fix />
          <Update />
          <New />
          <h4 className="text-gray-900 text-sm mt-2">Lorem ipsum dolor</h4>
        </div>
      <div className="text-gray-500 text-sm my-2 line-clamp-2">
        <p>
          Aliquam hac magna eu tincidunt. Interdum condimentum dui quis duis
          aliquet nunc diam. Lorem ipsum dolor sit, amet consectetur adipisicing
          elit. Vitae, quae natus, velit error voluptatum dolores hic ducimus
          fugit, nemo earum aut voluptatem? Est, quo distinctio quasi minus
          magni illum similique.
        </p>
      </div>
    </div>
  );
}

export default Changelog;
