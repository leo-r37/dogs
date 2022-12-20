import { useEffect, useState } from "react";
import { connect } from "react-redux";
import s from "./Breeds.module.css";
import { getBreeds } from "../redux/actions";

import Navbar from "../components/Navbar.jsx";
// import BreedCard from "../components/BreedCard";
import Loading from "../components/Loading.jsx";

const Breeds = ({ loading, breeds, getBreeds }) => {
  useEffect(() => {
    getBreeds();
  }, []);

  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [firstElement, setFirstElement] = useState(0);
  const [lastElement, setLastElement] = useState(ITEMS_PER_PAGE);

  const nextHandler = () => {
    if (currentPage >= Math.ceil(breeds.length / ITEMS_PER_PAGE)) return;
    setCurrentPage((prev) => prev + 1);
    setFirstElement((prev) => prev + ITEMS_PER_PAGE);
    setLastElement((prev) => prev + ITEMS_PER_PAGE);
  };

  const prevHandler = () => {
    if (currentPage <= 1) return;
    setCurrentPage((prev) => prev - 1);
    setFirstElement((prev) => prev - ITEMS_PER_PAGE);
    setLastElement((prev) => prev - ITEMS_PER_PAGE);
  };

  return (
    <div>
      {loading ? <Loading /> : null}
      <Navbar />

      {/* <BreedCard
        name={"Alaska Nevraska"}
        weight={"40 - 50"}
        image={"https://cdn2.thedogapi.com/images/hMyT4CDXR.jpg"}
        temperaments={['Loyal', 'Happy', 'Intelligent', 'Brave', 'Darkness', 'Violent']}
      /> */}
  
      <p>Pagina {currentPage}</p>
      <button onClick={prevHandler}>Prev</button>
      <button onClick={nextHandler}>Next</button>

      {/* {breeds &&
        breeds.map((b, i) => {
          return <p key={i}>{b.name}</p>;
        })} */}

      {breeds &&
        [...breeds].slice(firstElement, lastElement).map((b, i) => {
          return <p key={i}>{b.name}</p>;
        })}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.loading,
  breeds: state.breeds,
});

const mapDispatchToProps = (dispatch) => ({
  getBreeds: () => dispatch(getBreeds()),
});

// export default Breeds;
export default connect(mapStateToProps, mapDispatchToProps)(Breeds);
