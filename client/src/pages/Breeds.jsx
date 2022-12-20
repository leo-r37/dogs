import { connect } from "react-redux";
import s from "./Breeds.module.css";
import { getBreeds } from "../redux/actions";

import Loading from "../components/Loading.jsx";
import Navbar from "../components/Navbar.jsx";
import BreedCard from "../components/BreedCard";
import PageController from "../components/PageController";
import SearchBar from "../components/SearchBar";

const Breeds = ({
  loading,
  breeds,
  breedsByName,
  getBreeds,
  firstElement,
  lastElement,
}) => {
  if (breeds.length <= 0) getBreeds();

  return (
    <div>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <div className={s.container}>
          <div className={s.topBar}>
            <div className={s.topBarDivs}></div>
            <div className={s.topBarDivs}>
              <SearchBar />
            </div>
          </div>

          <div className={s.main}>
            <PageController />
            <div className={s.cardsContainer}>
              {breedsByName.length > 0
                ? [...breedsByName].slice(firstElement, lastElement).map((b, i) => {
                    return (
                      <BreedCard
                        key={i}
                        name={b.name}
                        weight={b.weight}
                        image={b.image}
                        temperaments={b.temperaments}
                      />
                    );
                  })
                : [...breeds].slice(firstElement, lastElement).map((b, i) => {
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
  breedsByName: state.breedsByName,
});

const mapDispatchToProps = (dispatch) => ({
  getBreeds: () => dispatch(getBreeds()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Breeds);
