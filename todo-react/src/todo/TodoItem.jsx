import React from "react";

export default ({ text, checked, onChange = () => {} }) => {
  const completedClass = checked ? "completed" : "";

  return (
    <>
      <li className={completedClass}>
        <label>
          <input type="checkbox" checked={checked} onChange={onChange} />
          {text}
        </label>
      </li>
    </>
  );
};
