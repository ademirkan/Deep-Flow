import styles from "./NavBar.module.css";
import { useState, useContext } from "react";
import { TimerConfigContext } from "../../Contexts/TimerConfigContext";
import { TimerStateContext } from "../../Contexts/TimerStateContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
/**
   * Requirements
   * -- containing div needs to adjust to the auto size
   *    -- background = size of inner grid, which adjusts based on elements
   * -- SettingsModal (title, settings = [(name, description, options = (type, isActive, ...) )] as CHILDREN)
   * 
   *    -- SettingObject = (name, description, activeValue, options=[(type))
   *    -- returns div of grid
   *  -- problem -- I don't want every option to rerender when one option changes. I only want that option to rerender.
   *  -- Solution 1 -- for every single setting, create a seperate context -- studyDuration, shortBreak, ... all seperate contexts
   *  -- Solution 2 -- group related things into same context, causing chunk rerendering (THIS IS MOST PRACTICAL)
   * 
   * 
   * <Popup
   *  .. trigger...
   * 
   * {(close)=>(
   *  <Title>
   *  <Setting name="Study duration" description="..." activeValue={studyDurationMs} setChoice={setStudyDurationMs} options=[{value, 25}, {value, 50}, {value, 90}, {userInput, "custom"}]>
   *  ...
   *  Closing button, onclick = close  
 
 * )}
   */

// Store options in children vs in props 
    // Children -- cleaner, but you have to pass in activeValue and setChoice to each one manually
        // 
    // props -- 
function Setting({
  name,
  description,
  activeValue,
  setChoice,
  children,
}) {
  // returns grid
  <div className="setting-grid">
    <div className="title">{name}</div>
    <div className="description">{description}</div>
    <div className="options">
      {options.map((option) => {
        <button className="button" onClick={setChoice(option.value)}>
          {option.label}
        </button>;
      })}
    </div>
  </div>;
}

function SettingOption({type, label, value})

export default function Config() {
  return (
    <Popup
      trigger={
        <i className="fa-solid fa-screwdriver-wrench relative control-icon text-base h-2 w-2 centered-container"></i>
      }
      modal
      nested
    >
      {(close) => (
        <div className="modal">
          <div className="header"> Pomodoro configuration </div>
          <div className="content">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a
            nostrum. Dolorem, repellat quidem ut, minima sint vel eveniet
            quibusdam voluptates delectus doloremque, explicabo tempore dicta
            adipisci fugit amet dignissimos?
            <br />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consequatur sit commodi beatae optio voluptatum sed eius cumque,
            delectus saepe repudiandae explicabo nemo nam libero ad, doloribus,
            voluptas rem alias. Vitae?
          </div>
          <div className="actions">
            <button
              className="button"
              onClick={() => {
                console.log("modal closed ");
                close();
              }}
            >
              close modal
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
}

export function PomodoroConfig() {
  const {
    studyDurationMs,
    shortBreakDurationMs,
    longBreakDurationMs,
    setLongBreakDurationMs,
    setShortBreakDurationMs,
    setStudyDurationMs,
  } = useContext(TimerConfigContext);

  const { isRunning } = useContext(TimerStateContext);

  return (
    <div id={styles.config} className={isRunning ? "hidden" : "visible"}>
      <span className={styles.SelectRow}>
        Study:
        <SelectRow
          selections={[
            duration("25", 1500000),
            duration("60", 3600000),
            duration("90", 5400000),
            duration("120", 7200000),
          ]}
          onSelect={setStudyDurationMs}
          selected={studyDurationMs}
        ></SelectRow>
      </span>
      <span className={styles.SelectRow}>
        Short Break:
        <SelectRow
          selections={[
            duration("5", 300000),
            duration("10", 600000),
            duration("20", 1200000),
            duration("30", 1800000),
          ]}
          onSelect={setShortBreakDurationMs}
          selected={shortBreakDurationMs}
        ></SelectRow>
      </span>
      <span className={styles.longBreakRow}>
        Long Break:
        <span>
          <SelectRow
            selections={[
              duration("15", 900000),
              duration("20", 1200000),
              duration("30", 1800000),
              duration("45", 2700000),
            ]}
            onSelect={setLongBreakDurationMs}
            selected={longBreakDurationMs}
          ></SelectRow>
        </span>
      </span>
    </div>
  );
}

function SelectRow({
  selections = [],
  customEnabled = true,
  onSelect,
  selected,
}) {
  let customSelect = true;
  return (
    <span className={styles.SelectRow}>
      {selections.map((duration) => {
        if (duration.time === selected) customSelect = false;
        return (
          <span
            className={
              styles.duration +
              " " +
              (duration.time === selected && styles.active)
            }
            onClick={() => {
              onSelect(duration.time);
            }}
          >
            {duration.label}
          </span>
        );
      })}
      {(() => {
        if (customEnabled) {
          return (
            <span
              className={
                styles.duration +
                " " +
                (customSelect && styles.active) +
                " fa-solid fa-screwdriver-wrench clickable-icon ml-1 relative centered-container inline-flex"
              }
              onClick={() => {
                onSelect(5 * 1000);
              }}
            ></span>
          );
        }
      })()}
    </span>
  );
}

function duration(label, ms) {
  return { label: label, time: ms };
}
