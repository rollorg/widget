import React, { useEffect, useRef, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useNavigate, useParams } from "react-router";
import Tag from "../components/Tag";
import { ChangelogInterface } from "../utils/types";
import { getDeviceMetadata } from "../utils/metadata";

function ChangelogDetails({
  changelogs,
}: {
  changelogs: ChangelogInterface[];
}) {
  const [showCategory, setShowCategory] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const changelog = changelogs.find(
    (item) => item._id.toString() === id
  );

  useEffect(() => {
    const storeMetadata = async () => {
      try {
        const metadata = await getDeviceMetadata();
        console.log(metadata);

        // make API call to store metadata
        // await fetch("api-endpoint/storeMetadata", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     changelogId: changelog?._id,
        //     metadata,
        //   }),
        // });
      } catch (error) {
        console.error("Failed to send metadata!", error);
      }
    };
    if (changelog) {
      storeMetadata();
    }
  }, [changelog]);

  const handleClickOutside = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (
      categoryRef.current &&
      !categoryRef.current.contains(event.target as Node)
    ) {
      setShowCategory(false);
    }
  };

  return (
    <div
      className="border-0 rounded-md shadow-lg p-5 md:w-[30rem]"
      onClick={handleClickOutside}
    >
      <div className="flex justify-center">
        <div className="mr-auto">
          <ArrowBackIosNewIcon
            style={{ fontSize: "small", marginLeft: "5px", cursor: "pointer" }}
            onClick={() => navigate(-1)}
          />
        </div>
        <div className="mr-auto">
          <h3 className="text-blue-600 font-semibold">{changelog?.title}</h3>
        </div>
      </div>
      <div className="border-[0.5px] my-3"></div>
      <div className="pt-2 mb-4">
        <div className="flex">
          {changelog?.tags.includes("fix") && (
            <Tag
              name="Fix"
              className="text-xs text-gray-100 bg-green-600 w-auto py-2 px-4 mr-2 rounded-l-full flex justify-center items-center rounded-tr-[15000px]"
            />
          )}
          {changelog?.tags.includes("update") && (
            <Tag
              name="Update"
              className="text-xs text-gray-100 bg-red-600 w-auto py-2 px-4 mr-2 rounded-l-full flex justify-center items-center rounded-br-[15000px]"
            />
          )}
          {changelog?.tags.includes("new") && (
            <Tag
              name="New"
              className="text-xs text-gray-100 bg-yellow-500 w-auto py-2 px-4 mr-2 rounded-l-full flex justify-center items-center rounded-tr-[15000px]"
            />
          )}
        </div>
        <div className="text-gray-500 text-sm my-2">
          <p>{changelog?.description}</p>
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center">
          <h3 className="text-sm font-semibold text-gray-500 my-2">
            Banana for scale 🍌
          </h3>
          <div className="flex justify-start">
            {changelog?.tags.includes("new") && (
              <Tag
                name="New"
                className="w-12 text-[0.7rem] my-1 mx-1 bg-blue-500 text-gray-100 rounded-full flex justify-center py-1"
              />
            )}
            {changelog?.tags.includes("update") && (
              <Tag
                name="Improvement"
                className="w-24 text-[0.7rem] my-1 mx-1 bg-purple-500 text-gray-100 rounded-full flex justify-center py-1"
              />
            )}
            {changelog?.tags.includes("fix") && (
              <Tag
                name="Fix"
                className="w-10 text-[0.7rem] my-1 mx-1 bg-red-500 text-gray-100 rounded-full flex justify-center py-1"
              />
            )}
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
              {changelog?.tags.includes("fix") && (
                <Tag
                  name="Fix"
                  className="w-7 h-5 text-[0.55rem] my-1 bg-red-500 text-gray-100 rounded-full flex justify-center items-center"
                />
              )}
              {changelog?.tags.includes("update") && (
                <Tag
                  name="Improvement"
                  className="h-5 text-[0.55rem] my-1 bg-purple-500 text-gray-100 rounded-full flex justify-center items-center"
                />
              )}
              {changelog?.tags.includes("new") && (
                <Tag
                  name="New"
                  className="w-7 h-5 text-[0.55rem] my-1 bg-blue-500 text-gray-100 rounded-full flex justify-center items-center"
                />
              )}
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
