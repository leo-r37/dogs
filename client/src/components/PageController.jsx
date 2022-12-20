import { connect } from "react-redux";
import s from "./PageController.module.css";
import { nextPage, prevPage } from "../redux/actions";

const PageController = ({
  breeds,
  currentPage,
  itemsPerPage,
  nextPage,
  prevPage,
}) => {
  const nextHandler = () => {
    if (currentPage >= Math.ceil(breeds.length / itemsPerPage)) return;
    nextPage();
  };

  const prevHandler = () => {
    if (currentPage <= 1) return;
    prevPage();
  };

  return (
    <div className={s.pageController}>
      <button onClick={prevHandler}>Prev</button>
      <p>Pagina {currentPage}</p>
      <button onClick={nextHandler}>Next</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  breeds: state.breeds,
  currentPage: state.currentPage,
  itemsPerPage: state.itemsPerPage,
});

const mapDispatchToProps = (dispatch) => ({
  nextPage: () => dispatch(nextPage()),
  prevPage: () => dispatch(prevPage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageController);
