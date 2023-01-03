import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import s from "./Breeds.module.css";
import {
  getData,
  clearSearch,
  firstPage,
  clearFilters,
  getDogById,
} from "../redux/actions";

import Loading from "../components/Loading.jsx";
import Navbar from "../components/Navbar.jsx";
import BreedCard from "../components/BreedCard";
import PageController from "../components/PageController";
import SearchBar from "../components/SearchBar";
import TemperamentsFilter from "../components/TemperamentsFilter";
import BreedOriginFilter from "../components/BreedOriginFilter";
import OrderByFilter from "../components/OrderByFilter";
import { useEffect } from "react";

const Breeds = ({
  loading,
  items,
  breeds,
  temperaments,
  getData,
  getDogById,
  firstElement,
  lastElement,
  clearSearch,
  firstPage,
  clearFilters,
}) => {

  useEffect(() => {
    getData();
  },[getData])

  const history = useHistory();

  const handleClearFilters = () => {
    clearSearch();
    firstPage();
    clearFilters();
  };

  const handleOnClick = (id) => {
    getDogById(id);
    history.push(`/breeds/${id}`)
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
                  <div
                    key={i}
                    onClick={() => handleOnClick(b.id)}
                    className={s.link}
                  >
                    <BreedCard
                      name={b.name}
                      weightMin={b.weightMin}
                      weightMax={b.weightMax}
                      image={b.image}
                      temperaments={b.temperaments}
                    />
                  </div>
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
  loading: state.breeds.loading,
  items: state.breeds.items,
  breeds: state.breeds.breeds,
  temperaments: state.breeds.temperaments,
  filters: state.filters.filters,
  firstElement: state.pages.firstElement,
  lastElement: state.pages.lastElement,
});

const mapDispatchToProps = (dispatch) => ({
  getData: () => dispatch(getData()),
  getDogById: (id) => dispatch(getDogById(id)),
  clearSearch: () => dispatch(clearSearch()),
  firstPage: () => dispatch(firstPage()),
  clearFilters: () => dispatch(clearFilters()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Breeds);
