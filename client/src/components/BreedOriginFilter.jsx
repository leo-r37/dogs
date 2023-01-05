import { connect } from "react-redux";
import { useState } from "react";
import s from "./BreedOriginFilter.module.css";
import {
  setItems,
  firstPage,
  setNotification,
  setName,
} from "../redux/actions";

const BreedOriginFilter = ({
  breeds,
  setItems,
  firstPage,
  setNotification,
  setName,
  name,
}) => {
  const [display, setDisplay] = useState(false);
  // const [name, setName] = useState("Origin");

  const toggleVisibility = () => {
    if (display) {
      setDisplay(!display);
      document.getElementById("origin").style.display = "none";
    } else {
      setDisplay(!display);
      document.getElementById("origin").style.display = "initial";
    }
  };

  const handleOrigin = (e) => {
    switch (e.target.value) {
      case "All":
        setItems(breeds);
        setName("All");
        firstPage();
        toggleVisibility();
        break;
      case "Existent":
        let apiItems = breeds.filter((b) => typeof b.id === "number");
        setItems(apiItems);
        setName("Existent");
        firstPage();
        toggleVisibility();
        break;
      case "Incorporated":
        let dbItems = breeds.filter((b) => typeof b.id === "string");
        if (dbItems.length <= 0) {
          setNotification("Error!", "There're no breeds created", "⛔");
          toggleVisibility();
        } else {
          setItems(dbItems);
          setName("Incorporated");
          firstPage();
          toggleVisibility();
        }
        break;
      default:
        break;
    }
  };

  const options = ["All", "Existent", "Incorporated"];

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

      <div id="origin" className={s.elementsContainer}>
        {options.map((t, i) => {
          return (
            <div key={i} className={s.element}>
              <div className={s.tempCheckDiv}>
                <input
                  type="radio"
                  name="origin"
                  id={t}
                  value={t}
                  onChange={(e) => handleOrigin(e)}
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
  breeds: state.breeds.breeds,
  name: state.filters.origin,
});

const mapDispatchToProps = (dispatch) => ({
  setItems: (data) => dispatch(setItems(data)),
  firstPage: () => dispatch(firstPage()),
  setNotification: (title, msg, ico) =>
    dispatch(setNotification(title, msg, ico)),
  setName: (payload) => dispatch(setName(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BreedOriginFilter);
