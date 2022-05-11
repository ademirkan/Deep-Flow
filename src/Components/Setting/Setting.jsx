import react from "react";
import Popup from "reactjs-popup";
import styles from "./Setting.module.css";
import { useState } from "react";

/**
 * Setting
 *    ButtonOptionList
 *    CustomizableButtonOptionList
 *    InputOption
 */
export default function Setting({ title, description, actionArea }) {
  return (
    <div className={styles.settingGrid}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
      <div className={styles.optionListContainer}>{actionArea}</div>
    </div>
  );
}

/**
 * Todo:
 */
export function ButtonOptionList({ options, currentValue, setValue }) {
  return (
    <>
      {options.map((option) => {
        return (
          <ButtonOption
            isActive={option.value === currentValue}
            onClick={() => setValue(option.value)}
          >
            {option.label}
          </ButtonOption>
        );
      })}
    </>
  );
}

export function ButtonOption({ isActive, onClick = () => {}, children }) {
  return (
    <div
      className={styles.button + " " + (isActive && styles.buttonActive)}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function InputOption({ currentValue, setValue }) {
  const [active, setActive] = useState(false);

  function handleKeyUp(event) {
    //key code for enter
    if (event.code === "Enter") {
      event.preventDefault();
      event.target.blur();
    }
  }

  return (
    <input
      type="number"
      className={
        styles.button +
        " " +
        styles.inputButton +
        " " +
        (false && styles.buttonActive)
      }
      placeholder={currentValue}
      onFocus={() => {
        setActive(true);
      }}
      onBlur={() => {
        setActive(false);
      }}
      onChange={(e) => {
        if (e.target.value && e.target.value > 0) setValue(e.target.value);
      }}
      onKeyUp={handleKeyUp}
      onWheel={(event) => event.currentTarget.blur()}
      autoFocus={false}
    ></input>
  );
}

export function CustomizableButtonOptionList({
  options,
  currentValue,
  setValue,
  toValue = (e) => e,
}) {
  return (
    <>
      <ButtonOptionList
        options={options}
        currentValue={currentValue}
        setValue={setValue}
      ></ButtonOptionList>
      <InputOption
        currentValue={"custom"}
        setValue={(value) => {
          setValue(toValue(parseInt(value)));
        }}
      ></InputOption>
    </>
  );
}

function ToggleOption({ label, value, activeValue, setValue }) {}
