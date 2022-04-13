import React, { useState } from "react";

export default ({ text, checked, onChange = () => {} }) => {
  const classes = [];
  if (checked) {
    classes.push("completed");
  }

  const [isEditing, setIsEditing] = useState(false);
  if (isEditing) {
    classes.push("editing");
  }

  const handleDoubleClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <>
      <li className={classes.join(" ")} onDoubleClick={handleDoubleClick}>
        <label>
          <input type="checkbox" checked={checked} onChange={onChange} />
          {text}
          {isEditing && <input type="text" />}
        </label>
      </li>
    </>
  );
};
