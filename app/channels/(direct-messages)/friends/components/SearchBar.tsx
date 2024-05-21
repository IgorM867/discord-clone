"use client";
import { SvgMagnifyingGlass } from "@/components/svgIcons/SvgMagnifyingGlass";
import { SvgXIcon } from "@/components/svgIcons/SvgXIcon";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

type SearchBarProps = {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
};
function SearchBar({ searchText, setSearchText }: SearchBarProps) {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <div className="flex bg-d-gray-550 mx-7 my-3 p-2 rounded-md">
      <input
        className="bg-d-gray-550 flex-grow text-d-gray-100 outline-none"
        placeholder="Search"
        value={searchText}
        onChange={handleInputChange}
      ></input>
      {searchText.length === 0 ? (
        <SvgMagnifyingGlass width={20} height={20} className="fill-d-gray-125" />
      ) : (
        <SvgXIcon
          width={20}
          height={20}
          className="fill-d-gray-125 cursor-pointer hover:fill-d-gray-100"
          onClick={() => setSearchText("")}
        />
      )}
    </div>
  );
}

export { SearchBar };
