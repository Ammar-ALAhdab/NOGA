import { useState } from "react";
import PropTypes from "prop-types";

function TextAreaComponent({ onChange, id }) {
  const [text, setText] = useState("");
  const handleTextChange = (e) => {
    setText(e.target.value);
    onChange(e.target.value);
  };
  return (
    <textarea
      id={id}
      value={text}
      onChange={handleTextChange}
      dir="rtl"
      className="w-[500px] h-[200px] outline-none border-2 border-primary focus:ring-2 focus:ring-blue-300 rounded-[20px] p-2 resize-none"
    ></textarea>
  );
}

TextAreaComponent.propTypes = {
  onChange: PropTypes.func,
  id: PropTypes.string,
};

export default TextAreaComponent;
