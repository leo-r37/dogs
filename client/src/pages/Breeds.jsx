import { connect } from "react-redux";
import s from "./Breeds.module.css";
import { getData, clearSearch } from "../redux/actions";

import Loading from "../components/Loading.jsx";
import Navbar from "../components/Navbar.jsx";
import BreedCard from "../components/BreedCard";
import PageController from "../components/PageController";
import SearchBar from "../components/SearchBar";
import DropdownList from "../components/DropdownList";

const Breeds = ({
  loading,
  breeds,
  breedsByName,
  temperaments,
  filters,
  getData,
  firstElement,
  lastElement,
  clearSearch,
}) => {
  if (breeds.length <= 0) getData();

  return (
    <div>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <div className={s.container}>
          <div className={s.topBar}>
            <div className={s.topBarDivs}>
              {temperaments.length > 0 ? (
                <DropdownList name="Temperaments" elements={temperaments} />
              ) : (
                <DropdownList />
              )}
            </div>
            <div className={s.topBarDivs}>
              <SearchBar />
              <div className={s.clearSearchDiv}>
                {breedsByName.length > 0 ? (
                  <div className={s.clearSearchButton} onClick={clearSearch}>
                    <p>CLEAR</p>
                    <p>SEARCH</p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className={s.main}>
            <PageController />
            <div className={s.cardsContainer}>
              {breedsByName.length > 0
                ? [...breedsByName]
                    .slice(firstElement, lastElement)
                    .map((b, i) => {
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
  temperaments: state.temperaments,
  filters: state.filters,
  firstElement: state.firstElement,
  lastElement: state.lastElement,
  breedsByName: state.breedsByName,
});

const mapDispatchToProps = (dispatch) => ({
  getData: () => dispatch(getData()),
  clearSearch: () => dispatch(clearSearch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Breeds);
