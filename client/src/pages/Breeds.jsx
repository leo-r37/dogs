import { Link } from "react-router-dom";
import { connect } from "react-redux";
import s from "./Breeds.module.css";
import {
  getData,
  clearSearch,
  firstPage,
  clearFilters,
} from "../redux/actions";

import Loading from "../components/Loading.jsx";
import Navbar from "../components/Navbar.jsx";
import BreedCard from "../components/BreedCard";
import PageController from "../components/PageController";
import SearchBar from "../components/SearchBar";
import TemperamentsFilter from "../components/TemperamentsFilter";
import BreedOriginFilter from "../components/BreedOriginFilter";
import OrderByFilter from "../components/OrderByFilter";

const Breeds = ({
  loading,
  items,
  breeds,
  temperaments,
  getData,
  firstElement,
  lastElement,
  clearSearch,
  firstPage,
  clearFilters,
}) => {
  if (breeds.length <= 0) getData();

  const handleClearFilters = () => {
    clearSearch();
    firstPage();
    clearFilters();
  };

  return (
    <div>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <div className={s.container}>
          <div className={s.topBar}>
            <div className={s.topBarDivs}>
              <div className={s.filters}>
                <TemperamentsFilter elements={temperaments} />
                <BreedOriginFilter />
                <OrderByFilter />
              </div>
            </div>
            <div className={s.clearSearchDiv}>
              {breeds.length !== items.length ? (
                <div
                  className={s.clearSearchButton}
                  onClick={handleClearFilters}
                >
                  <p>CLEAR</p>
                  <p>FILTERS</p>
                </div>
              ) : null}
            </div>
            <div className={s.topBarDivs}>
              <SearchBar />
            </div>
          </div>

          <div className={s.main}>
            <PageController />
            <div className={s.cardsContainer}>
              {[...items].slice(firstElement, lastElement).map((b, i) => {
                return (
                  <Link key={i} to={`/breeds/${b.id}`} className={s.link}>
                    <BreedCard
                      name={b.name}
                      weightMin={b.weightMin}
                      weightMax={b.weightMax}
                      image={b.image}
                      temperaments={b.temperaments}
                    />
                  </Link>
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
  items: state.items,
  breeds: state.breeds,
  temperaments: state.temperaments,
  filters: state.filters,
  firstElement: state.firstElement,
  lastElement: state.lastElement,
});

const mapDispatchToProps = (dispatch) => ({
  getData: () => dispatch(getData()),
  clearSearch: () => dispatch(clearSearch()),
  firstPage: () => dispatch(firstPage()),
  clearFilters: () => dispatch(clearFilters()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Breeds);
