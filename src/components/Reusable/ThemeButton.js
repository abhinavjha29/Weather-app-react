import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { setTheme } from "../../store/slice/themeSlice";

const ThemeButton = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    dispatch(setTheme(newTheme));
  };

  return (
    <div>
      <button
        onClick={toggleTheme}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "1.5rem",
        }}
      >
        {theme === "light" ? (
          <FontAwesomeIcon color="white" icon={faMoon} />
        ) : (
          <FontAwesomeIcon color="white" icon={faSun} />
        )}
      </button>
    </div>
  );
};

export default ThemeButton;
