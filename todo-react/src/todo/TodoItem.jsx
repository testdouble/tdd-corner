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
    commitChange(e.target.value);
  };

  const commitChange = (text) => {
    setText(text);
    setIsEditing(false);
  };

  return (
    <>
      <li className={classes.join(" ")} onDoubleClick={handleDoubleClick}>
        <input type="checkbox" checked={checked} onChange={onChange} />
        {isEditing ? (
          <input
            autoFocus
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                commitChange(text);
              }
            }}
            onBlur={handleBlur}
          />
        ) : (
          <span>{text}</span>
        )}
      </li>
    </>
  );
};
