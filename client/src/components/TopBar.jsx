import { connect } from "react-redux";
import s from "./TopBar.module.css";

import { clearSearch, firstPage, clearFilters } from "../redux/actions";

import SearchBar from "../components/SearchBar";
import TemperamentsFilter from "../components/TemperamentsFilter";
import BreedOriginFilter from "../components/BreedOriginFilter";
import OrderByFilter from "../components/OrderByFilter";

const TopBar = ({
  clearSearch,
  firstPage,
  clearFilters,
  temperaments,
  breeds,
  items,
}) => {
  const handleClearFilters = () => {
    clearSearch();
    firstPage();
    clearFilters();
  };

  return (
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
          <div className={s.clearSearchButton} onClick={handleClearFilters}>
            <p>CLEAR</p>
            <p>FILTERS</p>
          </div>
        ) : null}
      </div>
      <div className={s.topBarDivs}>
        <SearchBar />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  // loading: state.breeds.loading,
  items: state.breeds.items,
  breeds: state.breeds.breeds,
  temperaments: state.breeds.temperaments,
  // filters: state.filters.filters,
  // firstElement: state.pages.firstElement,
  // lastElement: state.pages.lastElement,
  // notificationStatus: state.notification.status,
  // notificationTitle: state.notification.title,
});

const mapDispatchToProps = (dispatch) => ({
  clearSearch: () => dispatch(clearSearch()),
  firstPage: () => dispatch(firstPage()),
  clearFilters: () => dispatch(clearFilters()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
