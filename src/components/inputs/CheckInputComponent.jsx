import { useState } from "react";
import PropTypes from "prop-types";

function CheckInputComponent({ label, onChange, id }) {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = () => {
    setIsChecked(!isChecked);
    onChange(!isChecked);
  };
  return (
    <div className="flex items-center justify-end w-full">
      <div
        dir="rtl"
        className="flex items-center justify-between gap-8 w-[500px]"
      >
        <label htmlFor={id} className="text-base">
          {label}
        </label>
        <div className="flex w-[200px] items-center justify-center">
          <input
            id={id}
            dir="ltr"
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
            className="w-[30px] h-[30px] outline-none cursor-pointer"
          ></input>
        </div>
      </div>
    </div>
  );
}

CheckInputComponent.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.string,
};

export default CheckInputComponent;
