import react from "react";
import Popup from "reactjs-popup";
import styles from "./Setting.module.css";
import { useState } from "react";

export default function Setting({ title, description, actionArea }) {
  return (
    <div className={styles.settingGrid}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
      {actionArea}
    </div>
  );
}

/**
 * Todo:
 */
export function ButtonOptionList({ options, currentValue, setValue }) {
  return (
    <div className={styles.options}>
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
    </div>
  );
}

export function ButtonOption({ isActive, onClick = () => {}, children }) {
  return (
    <div className={styles.option + " " + styles.buttonOption}>
      <button
        className={
          styles.button +
          " " +
          (isActive ? styles.buttonActive : styles.buttonDefault)
        }
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}

export function InputOption() {
  return <div className="w-full bg-slate-600"></div>;
}

export function CustomButtonOption({ isActive, setValue, children }) {}

function ToggleOption({ label, value, activeValue, setValue }) {}
