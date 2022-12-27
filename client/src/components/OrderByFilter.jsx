import { connect } from "react-redux";
import { useState } from "react";
import s from "./OrderByFilter.module.css";
import { setItems, firstPage } from "../redux/actions";

const OrderByFilter = ({ items, setItems, firstPage }) => {
  const [display, setDisplay] = useState(false);
  const [name, setName] = useState("Order by");

  const toggleVisibility = () => {
    if (display) {
      setDisplay(!display);
      document.getElementById("orderBy").style.display = "none";
    } else {
      setDisplay(!display);
      document.getElementById("orderBy").style.display = "initial";
    }
  };

  const handleOrigin = (e) => {
    switch (e.target.value) {
      case "A-Z":
        let A_Z_items = items.sort((a, b) => {
          a = a.name.toLowerCase();
          b = b.name.toLowerCase();
          if (a > b) return 1;
          if (a < b) return -1;
          else return 0;
        });
        setItems(A_Z_items);
        setName("A-Z");
        firstPage();
        toggleVisibility();
        break;
      case "Z-A":
        let Z_A_items = items.sort((a, b) => {
          a = a.name.toLowerCase();
          b = b.name.toLowerCase();
          if (a < b) return 1;
          if (a > b) return -1;
          else return 0;
        });
        setItems(Z_A_items);
        setName("Z-A");
        firstPage();
        toggleVisibility();
        break;
      case "Weight (Asc)":
        let WeightAsc = items.sort((a, b) => {
          a = parseInt(a.weightMin);
          b = parseInt(b.weightMin);
          return a - b;
        });
        setItems(WeightAsc);
        setName("Weight (Asc)");
        firstPage();
        toggleVisibility();
        break;
      case "Weight (Desc)":
        let WeightDesc = items.sort((a, b) => {
          a = parseInt(a.weightMin);
          b = parseInt(b.weightMin);
          return b - a;
        });
        setItems(WeightDesc);
        setName("Weight (Desc)");
        firstPage();
        toggleVisibility();
        break;
      default:
        break;
    }
  };

  const options = ["A-Z", "Z-A", "Weight (Asc)", "Weight (Desc)"];

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

      <div id="orderBy" className={s.elementsContainer}>
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
  items: state.items
});

const mapDispatchToProps = (dispatch) => ({
  setItems: (data) => dispatch(setItems(data)),
  firstPage: () => dispatch(firstPage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderByFilter);
