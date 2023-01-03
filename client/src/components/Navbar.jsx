import s from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import img from "../imgs/dogPaw-logo.png";

const Navbar = () => {
  return (
    <div className={s.container}>
      <div className={s.div}>
        <NavLink to="/breeds" className={s.unselected}>
          <h1 className={s.title}>DogPaw</h1>
        </NavLink>
      </div>
      <div className={`${s.div} ${s.logo}`}>
        <NavLink to="/breeds" className={s.unselected}>
          <img src={img} className={s.img} alt="DogPaw Logo" />
        </NavLink>
      </div>
      <div className={`${s.div} ${s.buttons}`}>
        <NavLink to="/create" className={s.createButton}>
          Create your own!
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
