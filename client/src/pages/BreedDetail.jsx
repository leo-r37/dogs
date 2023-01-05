import s from "./BreedDetail.module.css";
import { useState } from "react";
import { connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import Navbar from "../components/Navbar";
import Loading from "../components/Loading.jsx";

import {
  getDogById,
  clearCurrentDog,
  deleteBreed,
  setNotification,
} from "../redux/actions";

const BreedDetail = ({
  getDogById,
  deleteBreed,
  breeds,
  data,
  loading,
  setNotification,
}) => {
  let { id } = useParams();
  const history = useHistory();

  const [alert, setAlert] = useState(false);

  if (Object.keys(data) <= 0) getDogById(id);

  let {
    name,
    heightMin,
    heightMax,
    weightMin,
    weightMax,
    life_span,
    image,
    temperaments,
  } = data;

  const handleConfirmation = () => {
    setAlert(!alert);
  };

  const handleDelete = async () => {
    setAlert(!alert);
    try {
      let response = await deleteBreed(id);
      if (response) {
        setNotification("Success", "Breed deleted succesfully", "✅");
        history.push("/breeds");
      }
    } catch (e) {
      console.log("error desde breed detail");
      console.log(e);
    }
  };

  const handlePageController = async (side) => {
    let newId = "";
    let dbItems = breeds.filter((b) => typeof b.id === "string");
    let count = dbItems.length;
    if (id.startsWith("db")) {
      let num = parseInt(id.slice(2));
      side === "left" ? num-- : num++;
      if (num <= 0) return;
      num <= count ? (newId = `db0${num}`) : (newId = 1);
    } else {
      let num = parseInt(id);
      side === "left" ? num-- : num++;
      if (num >= 265) return;
      num >= 1 ? (newId = `${num}`) : (newId = `db0${count}`);
    }
    try {
      await getDogById(newId);
      history.push(`/breeds/${newId}`);
    } catch (e) {
      setNotification("Error!", "Can't find a breed with that ID", "🚫");
      history.push("/breeds");
      return e;
    }
  };

  return (
    <div>
      {alert ? (
        <div className={s.confirmDeleteAlertDivContainer}>
          <div className={s.alertDiv}>
            <div className={s.alertTitleDiv}>
              <h3>Confirm delete?</h3>
            </div>
            <div className={s.alertButtonsDiv}>
              <button className={s.button} onClick={handleConfirmation}>
                <p>Cancel</p>
              </button>
              <button
                className={`${s.button} ${s.buttonDelete}`}
                onClick={handleDelete}
              >
                <i className="fi fi-rr-trash"></i>
                <p>Delete</p>
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <Navbar />{" "}
      {loading ? (
        <Loading />
      ) : (
        <div className={s.container}>
          <div
            className={
              id !== "db01" ? s.pageControllerDiv : s.pageControllerDivDisabled
            }
            onClick={() => handlePageController("left")}
          >
            <div
              className={id !== "db01" ? s.pageLeft : s.pageLeftDisabled}
            ></div>
          </div>

          <div className={s.main}>
            <div className={s.imgDiv}>
              <img src={image} alt="Dog" />
            </div>

            <div className={s.dataDiv}>
              <div className={s.infoDiv}>
                <h2>{name}</h2>
                <div className={s.data}>
                  <p>
                    <span className={s.highlighted}>Height:</span> {heightMin} -{" "}
                    {heightMax} cm
                  </p>
                  <p>
                    <span className={s.highlighted}>Weight:</span> {weightMin} -{" "}
                    {weightMax} Kg
                  </p>
                  <p>
                    <span className={s.highlighted}>Life span:</span>{" "}
                    {life_span}
                  </p>
                </div>
              </div>

              <div className={s.temperamentsDiv}>
                {temperaments
                  ? temperaments.map((t, i) => {
                      return (
                        <p key={i} className={s.tempText}>
                          {t.name}
                        </p>
                      );
                    })
                  : null}
              </div>

              <div className={s.controllerDiv}>
                {typeof data.id === "string" ? (
                  <button
                    className={`${s.button} ${s.buttonDelete}`}
                    onClick={handleConfirmation}
                  >
                    <i className="fi fi-rr-trash"></i>
                    <p>Delete</p>
                  </button>
                ) : null}
              </div>
            </div>
          </div>

          <div
            className={
              id !== "264" ? s.pageControllerDiv : s.pageControllerDivDisabled
            }
            onClick={() => handlePageController("right")}
          >
            <div
              className={id !== "264" ? s.pageRight : s.pageRightDisabled}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.breeds.loading,
  breeds: state.breeds.breeds,
  data: state.breeds.currentDog,
});

const mapDispatchToProps = (dispatch) => ({
  getDogById: (id) => dispatch(getDogById(id)),
  clearCurrentDog: () => dispatch(clearCurrentDog()),
  deleteBreed: (id) => dispatch(deleteBreed(id)),
  setNotification: (title, msg, ico) =>
    dispatch(setNotification(title, msg, ico)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BreedDetail);
