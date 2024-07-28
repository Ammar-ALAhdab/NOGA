import { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

function NumberInputComponent({
  label,
  onChange,
  id,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
}) {
  const [value, setValue] = useState(min);
  const handleChange = (e) => {
    const newValue = e.target.value === "" ? "" : Number(e.target.value);
    if (newValue === "" || (newValue >= min && newValue <= max)) {
      setValue(newValue);
    }
  };
  const handleDecrement = () => {
    setValue((prevValue) => Math.max(prevValue - step, min));
  };

  const handleIncrement = () => {
    setValue((prevValue) => Math.min(prevValue + step, max));
  };
  return (
    <div
      dir="rtl"
      className="flex items-center justify-between gap-8 w-[500px]"
    >
      <label htmlFor={id} className="text-base">
        {label}
      </label>
      <div className="flex items-center justify-between gap-1 relative">
        <button
          type="button"
          onClick={handleIncrement}
          className="w-[20px] h-[20px] rounded-full absolute right-2 bg-[#3457D5] text-white flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faPlus} size="sm" className="cursor-pointer" />
        </button>
        <input
          id={id}
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={handleChange}
          className="w-[250px] h-[40px] text-center outline-none border-2 border-primary focus:ring-2 focus:ring-blue-300 rounded-[20px] px-2"
        ></input>

        <button
          type="button"
          onClick={handleDecrement}
          className="w-[20px] h-[20px] rounded-full absolute left-2 bg-[#3457D5] text-white flex items-center justify-center"
        >
          <FontAwesomeIcon
            icon={faMinus}
            size="sm"
            className="cursor-pointer"
          />
        </button>
      </div>
    </div>
  );
}

NumberInputComponent.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  initValue: PropTypes.string,
  id: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
};

export default NumberInputComponent;
