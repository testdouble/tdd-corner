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
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <>
      <li className={classes.join(" ")} onDoubleClick={handleDoubleClick}>
        <label>
          <input type="checkbox" checked={checked} onChange={onChange} />
          {isEditing ? (
            <input
              autoFocus
              type="text"
              value={text}
              onChange={() => {}}
              onBlur={handleBlur}
            />
          ) : (
            text
          )}
        </label>
      </li>
    </>
  );
};
