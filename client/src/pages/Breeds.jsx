import { connect } from "react-redux";
import s from "./Breeds.module.css";
import { getBreeds } from "../redux/actions";

import Loading from "../components/Loading.jsx";
import Navbar from "../components/Navbar.jsx";
import BreedCard from "../components/BreedCard";
import PageController from "../components/PageController";

const Breeds = ({ loading, breeds, getBreeds, firstElement, lastElement }) => {
  if (breeds.length <= 0) getBreeds();

  return (
    <div>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <div className={s.container}>
          <PageController />
          

          <div className={s.cardsContainer}>
            {[...breeds].slice(firstElement, lastElement).map((b, i) => {
              return (
                <BreedCard
                  key={i}
                  name={b.name}
                  weight={b.weight}
                  image={b.image}
                  temperaments={b.temperaments}
                />
              );
            })}
          </div>

          <PageController />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.loading,
  breeds: state.breeds,
  firstElement: state.firstElement,
  lastElement: state.lastElement,
});

const mapDispatchToProps = (dispatch) => ({
  getBreeds: () => dispatch(getBreeds()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Breeds);
