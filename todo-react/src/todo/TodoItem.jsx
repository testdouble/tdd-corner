import React, { useState } from "react";

export default ({ initialText, checked, onChange = () => {} }) => {
  const classes = [];
  if (checked) {
    classes.push("completed");
  }

  const [isEditing, setIsEditing] = useState(false);
  if (isEditing) {
    classes.push("editing");
  }

  const [text, setText] = useState(initialText);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = (e) => {
    console.log("handleBlur e.target.value", e.target.value);
    setText(e.target.value);
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
              onChange={(e) => {
                console.log("onChange e.target.value", e.target.value);
                setText(e.target.value);
              }}
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
