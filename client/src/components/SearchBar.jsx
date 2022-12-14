import { useState } from "react";
import s from "./SearchBar.module.css";
import { connect } from "react-redux";
import { getBreedsByName, firstPage } from "../redux/actions";

const SearchBar = ({ getBreedsByName, firstPage }) => {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearchButton = () => {
    getBreedsByName(input);
    firstPage();
  };

  const inputKey = (e) => {
    if (e.keyCode === 13) {
      handleSearchButton();
    }
  };

  return (
    <div className={s.container}>
      <div className={s.inputDiv}>
        <input
          className={s.input}
          onChange={(e) => handleChange(e)}
          value={input}
          onKeyUp={(e) => inputKey(e)}
        />
      </div>
      <div className={s.buttonDiv} onClick={handleSearchButton}>
        <i className="fi fi-rr-search"></i>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getBreedsByName: (name) => dispatch(getBreedsByName(name)),
  firstPage: () => dispatch(firstPage()),
});

export default connect(null, mapDispatchToProps)(SearchBar);
