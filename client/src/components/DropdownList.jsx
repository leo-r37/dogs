import { connect } from "react-redux";
import { useState } from "react";
import s from "./DropdownList.module.css";
import { setFilters } from "../redux/actions";

const DropdownList = ({ name, elements, setFilters, filters }) => {
  const [display, setDisplay] = useState(false);

  const [filter, setFilter] = useState([]);

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
    if (e.target.checked === true) setFilter(filter.concat(e.target.value));
    if (e.target.checked === false)
      setFilter(filter.filter((t) => t !== e.target.value));
  };

  const handleApplyButton = () => {
    setFilters(filter);
  };

  return (
    <div className={s.container}>
      <div className={s.titleContainer} onClick={toggleVisibility}>
        <div className={s.textDiv}>
          <p>{name}</p>
        </div>
        <div className={s.icoDiv}>
          <i className="fi fi-rr-angle-small-down"></i>
        </div>
      </div>

      <div id="dropdown" className={s.elementsContainer}>
        <div className={s.applyButtonDiv}>
          {elements ? (
            <button onClick={handleApplyButton}>APLICAR</button>
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
                    name={name}
                    id={t}
                    value={t}
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
  filters: state.filters
})

const mapDispatchToProps = (dispatch) => ({
  setFilters: (filters) => dispatch(setFilters(filters)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DropdownList);
