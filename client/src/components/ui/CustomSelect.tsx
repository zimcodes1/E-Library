import { useState, useRef, useEffect, type ReactNode } from "react";

function CustomSelect({
  defaultValue,
  options,
  customStyles,
  onChange,
  icon,
}: {
  defaultValue?: string;
  options?: Array<{ 
    value: string; 
    label?: string; 
    customStyles?: string;
  }>;
  customStyles?: string;
  onChange?: (value: string) => void;
  icon?: string | ReactNode;
}) {
  const [value, setValue] = useState(defaultValue || "Select");
  const [selectedValue, setSelectedValue] = useState(defaultValue || "");
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
      className="flex h-6/10 w-50 text-gray-300 text-sm relative rounded-l-2xl items-center px-2 justify-center cursor-pointer select-none"
    >
      <p className="flex items-center gap-2">
        <span>{value}</span>
        {icon ? (
          typeof icon === "string" ? (
            <i className={icon}></i>
          ) : (
            icon
          )
        ) : (
          <i className="fa fa-angle-down"></i>
        )}
      </p>
      <div
        className={`max-sm:w-auto w-50 absolute top-10 z-10 -left-3 max-sm:left-0 bg-[#0a061b] border border-purple-500/20 rounded-2xl backdrop-blur-2xl max-h-56 overflow-y-auto flex flex-col p-2 ${customStyles} ${activeState}`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {options?.map((option, index) => {
          const isSelected = selectedValue === option.value;
          return (
            <span
              onClick={() => {
                setValue(option.label || option.value);
                setSelectedValue(option.value);
                onChange?.(option.value);
              }}
              key={index}
              className={`w-full h-10 shrink-0 rounded-lg flex items-center gap-2 px-2 cursor-pointer transition-colors duration-150 ${
                isSelected
                  ? "bg-blue-600 text-white font-medium"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <span>{option.label || option.value}</span>
            </span>
          );
        })}
      </div>
    </span>
  );
}

export default CustomSelect;
