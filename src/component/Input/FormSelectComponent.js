import React from "react";
import Select from "react-select";
export default ({ onChange, options, value, className, isMulti, required }) => {
  const defaultValue = (options, value) => {
    return options ? options.find((option) => option.value === value) : "";
  };
  return (
    <div className={className}>
      <Select
        value={defaultValue(options, value)}
        onChange={(value) => onChange(value)}
        options={options}
        defaultValue={value}
        isMulti={isMulti}
        required={required}
      ></Select>
    </div>
  );
};
