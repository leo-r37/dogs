import { connect } from "react-redux";
import { useState } from "react";
import s from "./TemperamentsFilter.module.css";
import {
  setItems,
  firstPage,
  setFilters,
  deleteFilter,
  clearFilters,
} from "../redux/actions";

const TemperamentsFilter = ({
  elements,
  items,
  breeds,
  firstPage,
  setItems,
  filters,
  setFilters,
  deleteFilter,
  clearFilters,
}) => {
  const [display, setDisplay] = useState(false);

  const toggleVisibility = () => {
    if (display) {
      setDisplay(!display);
      document.getElementById("dropdown").style.display = "none";
    } else {
      setDisplay(!display);
      document.getElementById("dropdown").style.display = "initial";
    }
  };

  const handleCheckbox = (e) => {
    let value = e.target.value;
    let state = e.target.checked;

    if (state) {
      let filteredItems = [];
      breeds.forEach((i) => {
        if (i.temperaments && i.temperaments.some((t) => t.name === value))
          filteredItems.push(i);
      });
      if (filteredItems.length > 0) {
        firstPage();
        setFilters(value);
        items.length < breeds.length
          ? setItems(items.concat(filteredItems))
          : setItems(filteredItems);
      }
    } else {
      deleteFilter(value);
      let filteredItems = [];
      items.forEach((i) => {
        if (i.temperaments.every((t) => t.name !== value))
          filteredItems.push(i);
      });
      if (filteredItems.length > 0) {
        firstPage();
        setItems(filteredItems);
      } else {
        firstPage();
        setItems(breeds);
      }
    }
  };

  const handleClearButton = () => {
    firstPage();
    clearFilters();
    setItems(breeds);
  };
  
  return (
    <div className={s.container}>
      {filters.length > 0 ? (
        <div className={s.counter}>
          <p>{filters.length}</p>
        </div>
      ) : null}
      <div className={s.titleContainer} onClick={toggleVisibility}>
        <div className={s.textDiv}>
          <p>Temperaments</p>
        </div>
        <div className={s.icoDiv}>
          <i className="fi fi-rr-angle-small-down"></i>
        </div>
      </div>

      <div id="dropdown" className={s.elementsContainer}>
        <div className={s.applyButtonDiv}>
          {elements ? (
            <button onClick={handleClearButton}>CLEAR</button>
          ) : (
            <p>No items</p>
          )}
        </div>
        {elements &&
          elements.map((t, i) => {
            return (
              <div key={i} className={s.element}>
                <div className={s.tempCheckDiv}>
                  <input
                    type="checkbox"
                    name="Temperaments"
                    id={t}
                    value={t}
                    checked={filters.includes(t) || ''}
                    onChange={(e) => handleCheckbox(e)}
                  />
                </div>
                <div className={s.tempTextDiv}>
                  <label htmlFor={t}>{t}</label>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  filters: state.filters,
  items: state.items,
  breeds: state.breeds,
});

const mapDispatchToProps = (dispatch) => ({
  setItems: (filter) => dispatch(setItems(filter)),
  setFilters: (value, state) => dispatch(setFilters(value, state)),
  firstPage: () => dispatch(firstPage()),
  clearFilters: () => dispatch(clearFilters()),
  deleteFilter: (filter) => dispatch(deleteFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TemperamentsFilter);
