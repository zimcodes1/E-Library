import { useState, useRef, useEffect } from "react";

function CustomSelect({
  defaultValue,
  options,
  customStyles,
}: {
  defaultValue?: string;
  options?: Array<{ value: string; label?: string; customStyles?: string }>;
  customStyles?: string;
}) {
  const [value, setValue] = useState(defaultValue || "Select");
  const [activeState, setActiveState] = useState("hidden");
  const selectRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setActiveState("hidden");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <span
      ref={selectRef}
      onClick={() => {
        activeState == "hidden" ? setActiveState("") : setActiveState("hidden");
      }}
      className="flex h-6/10 w-auto text-gray-300 text-sm relative rounded-l-2xl items-center px-2 justify-center cursor-pointer"
    >
      <p>
        {value} <i className="fa fa-angle-down"></i>{" "}
      </p>
      <div
        className={`max-sm:w-auto w-50 absolute top-10 z-10 -left-3 max-sm:left-0 bg-gray-700 border border-gray-600 rounded-2xl backdrop-blur-3xl h-fit flex flex-col overflow-hidden p-2 ${customStyles} ${activeState}`}
      >
        {options?.map((option, index) => {
          return (
            <span
              onClick={() => {
                setValue(option.label || option.value);
              }}
              key={index}
              className="w-full h-10 text-gray-300 hover:bg-gray-500 rounded-lg flex items-center px-2 cursor-pointer"
            >
              {option.label || option.value}
            </span>
          );
        })}
      </div>
    </span>
  );
}

export default CustomSelect;
