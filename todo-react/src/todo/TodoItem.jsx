import React, { useState } from "react";

export default ({ text, checked, onChange = () => {} }) => {
  return (
    <>
      <li>
        <input type="checkbox" checked={checked} onChange={onChange} />
        {text}
      </li>
    </>
  );
};
