import React, { useState } from "react";

export default ({ initialText='', checked, onChange = () => {} }) => {
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
    console.log("sdsdsds")
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
              console.log('change', e.target.value);
              setText(e.target.value);
              // return true;
            }}
            onKeyPress={(e) => {
              console.log('onKeyPress', e.key);
              if (e.key === "Enter") {
                commitChange(text);
              }
              // return true;
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
