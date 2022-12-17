import s from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={s.container}>
      <div className={s.div}>
        <h1 className={s.title}>DogPaw</h1>
      </div>
      <div className={`${s.div} ${s.buttons}`}>
        <NavLink
          to="/breeds"
          className={(isActive) => (!isActive ? s.unselected : s.selected)}
        >
          Home
        </NavLink>
        <NavLink
          to="/create"
          className={(isActive) => (!isActive ? s.unselected : s.selected)}
        >
          New breed
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
