import React from "react";

const InputFields = ({ labelId, labelName, inputType, inputName, inputId }) => {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <label htmlFor={labelId}>{labelName}</label>
      <input
        type={inputType}
        name={inputName}
        id={inputId}
        className="focus:outline-none shadow px-5 py-2 bg-gray-100 text-gray-500"
      />
    </div>
  );
};

export default InputFields;
