import s from './Breeds.module.css';
import Navbar from "../components/Navbar";
import { connect } from "react-redux";
import { increment, decrement } from "../redux/actions";

const Breeds = ({ count, increment, decrement }) => {
  return (
    <div>
      <Navbar />
      <input></input>
      <p>El número alojado en el estado es: {count}</p>
      <button onClick={increment} className={s.button}>+</button>
      <button onClick={decrement} className={s.button}>-</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  count: state.count
});

const mapDispatchToProps = (dispatch) => ({
  increment: () => dispatch(increment()),
  decrement: () => dispatch(decrement())
});

// export default Breeds;
export default connect(mapStateToProps, mapDispatchToProps)(Breeds);
