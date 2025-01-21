import React, { useRef, useState } from "react";
import FixCategory from "../components/categories/FixCategory";
import ImprovementCategory from "../components/categories/ImprovementCategory";
import NewCategory from "../components/categories/NewCategory";
import Fix from "../components/tags/Fix";
import New from "../components/tags/New";
import Update from "../components/tags/Update";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function ChangelogDetails() {
  const [showCategory, setShowCategory] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setShowCategory(false);
    }  
  }

  return (
    <div className="w-[30rem] border-0 rounded-md shadow-lg p-5" onClick={handleClickOutside}>
      <div className="flex justify-center">
        <div className="mr-auto">
          <ArrowBackIosNewIcon
            style={{ fontSize: "small", marginLeft: "5px" }}
          />
        </div>
        <div className="mr-auto">
          <h3 className="text-blue-600 font-semibold">Lorem ipsum dolor</h3>
        </div>
      </div>
      <div className="border-[0.5px] my-3"></div>
      <div className="pt-2 mb-4">
        <div className="flex">
          <Fix />
          <Update />
          <New />
        </div>
        <div className="text-gray-500 text-sm my-2">
          <p>
            Aliquam hac magna eu tincidunt. Interdum condimentum dui quis duis
            aliquet nunc diam. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Vitae, quae natus, velit error voluptatum dolores
            hic ducimus fugit, nemo earum aut voluptatem? Est, quo distinctio
            quasi minus magni illum similique.
          </p>
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center">
          <h3 className="text-sm font-semibold text-gray-500 my-2">
            Banana for scale 🍌
          </h3>
          <div className="flex justify-start">
            <NewCategory className="w-12 text-[0.7rem] my-1 mx-[2.5px]" />
            <ImprovementCategory className="w-24 text-[0.7rem] my-1 mx-[2.5px]" />
            <FixCategory className="w-10 text-[0.7rem] my-1 mx-[2.5px]" />
          </div>
        </div>
        <div className="bg-blue-500 w-[50%] h-20 pl-3 ml-auto">
          <h3 className="text-sm font-semibold text-gray-100 mt-5">
            Banana for scale 🍌
          </h3>
          <div className="border-t-[0.5px] border-gray-300"></div>
          <div
            className="text-gray-100 text-xs mt-3 font-light border-[0.5px] rounded-full w-24 flex justify-center  cursor-pointer"
            ref={categoryRef}
            onClick={() => {
              setShowCategory(!showCategory);
            }}
          >
            Categories{" "}
            <span>
              {showCategory ? (
                <KeyboardArrowDownIcon
                  style={{ fontSize: "medium", marginBottom: "1px" }}
                />
              ) : (
                <KeyboardArrowUpIcon
                  style={{ fontSize: "medium", marginBottom: "1px" }}
                />
              )}
            </span>
          </div>
          {showCategory && (
            <div className="absolute z-30 rounded-md shadow-md bg-white w-24 p-2 mt-[0.1rem]">
              <FixCategory className="w-8 h-5 text-[0.6rem] my-1" />
              <ImprovementCategory className="h-5 text-[0.6rem] my-1" />
              <NewCategory className="w-10 h-5 text-[0.6rem] my-1" />
            </div>
          )}
        </div>
      </div>
      <div className="mt-24 text-gray-500 text-sm">
        <p>
          Convallis in nam eros ultrices a vulputate condiment aliquam. Lacus
          fusce ut pulvinar accumsan id. In risu posuere quis arcu.
        </p>
      </div>
    </div>
  );
}

export default ChangelogDetails;
