import s from "./BreedDetail.module.css";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Loading from "../components/Loading.jsx";

import { getDogById, clearCurrentDog } from "../redux/actions";

const BreedDetail = ({ getDogById, clearCurrentDog, data, loading }) => {
  let { id } = useParams();

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

  return (
    <div>
      <Navbar />{" "}
      <Link to="/breeds" onClick={clearCurrentDog} className={s.link}>
        Home
      </Link>
      {loading ? (
        <Loading />
      ) : (
        <div className={s.container}>
          <div className={s.pageControllerDiv}>
            <div className={s.pageLeft}></div>
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
                {typeof data.id === "string" ? <button>delete</button> : null}
              </div>
            </div>
          </div>

          <div className={s.pageControllerDiv}>
            <div className={s.pageRight}></div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.loading,
  data: state.currentDog,
});

const mapDispatchToProps = (dispatch) => ({
  getDogById: (id) => dispatch(getDogById(id)),
  clearCurrentDog: () => dispatch(clearCurrentDog()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BreedDetail);
