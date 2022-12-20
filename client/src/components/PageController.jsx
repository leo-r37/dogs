import { connect } from "react-redux";
import s from "./PageController.module.css";
import {
  nextPage,
  prevPage,
  firstPage,
  lastPage,
  setPage,
} from "../redux/actions";
import { useEffect, useState } from "react";

const PageController = ({
  breeds,
  breedsByName,
  currentPage,
  itemsPerPage,
  nextPage,
  prevPage,
  firstPage,
  lastPage,
  setPage,
}) => {
  const [inputPage, setInputPage] = useState(currentPage);

  useEffect(() => {
    setInputPage(currentPage);
  }, [currentPage]);

  let numOfLastPage;
  if (breedsByName.length > 0) {
    numOfLastPage = Math.ceil(breedsByName.length / itemsPerPage);
  } else {
    numOfLastPage = Math.ceil(breeds.length / itemsPerPage);
  }

  const firstPageHandler = () => {
    firstPage();
    setInputPage(1);
  };

  const prevPageHandler = () => {
    if (currentPage <= 1) return;
    prevPage();
    setInputPage(inputPage - 1);
  };

  const nextPageHandler = () => {
    if (currentPage >= numOfLastPage) return;
    nextPage();
    setInputPage(parseInt(inputPage) + 1);
  };

  const lastPageHandler = () => {
    if (breedsByName.length > 0) {
      let numOfPage = Math.ceil(breedsByName.length / itemsPerPage);
      setPage(numOfPage);
      setInputPage(numOfLastPage);
    } else {
      lastPage();
      setInputPage(numOfLastPage);
    }
  };

  const inputKey = (e) => {
    if (e.keyCode === 13) {
      if (isNaN(inputPage)) {
        setInputPage(currentPage);
        return;
      }
      if (inputPage > numOfLastPage) {
        setPage(numOfLastPage);
        setInputPage(numOfLastPage);
      } else if (inputPage <= 0) {
        setPage(1);
        setInputPage(1);
      } else {
        setPage(parseInt(inputPage));
        setInputPage(inputPage);
      }
    }
  };

  const handleChange = (e) => {
    setInputPage(e.target.value);
  };

  return (
    <div className={s.pageController}>
      <button className={s.smallButtons} onClick={firstPageHandler}>
        <i className="fi fi-ss-rewind"></i>
      </button>
      <button onClick={prevPageHandler}>
        <i className="fi fi-sr-caret-left"></i>
      </button>

      <input
        className={s.input}
        value={inputPage}
        onChange={(e) => handleChange(e)}
        onKeyUp={(e) => inputKey(e)}
      />
      <p>de {numOfLastPage}</p>

      <button onClick={nextPageHandler}>
        <i className="fi fi-sr-caret-right"></i>
      </button>
      <button className={s.smallButtons} onClick={lastPageHandler}>
        <i className="fi fi-ss-forward"></i>
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  breeds: state.breeds,
  currentPage: state.currentPage,
  itemsPerPage: state.itemsPerPage,
  breedsByName: state.breedsByName,
});

const mapDispatchToProps = (dispatch) => ({
  nextPage: () => dispatch(nextPage()),
  prevPage: () => dispatch(prevPage()),
  firstPage: () => dispatch(firstPage()),
  lastPage: () => dispatch(lastPage()),
  setPage: (page) => dispatch(setPage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageController);
