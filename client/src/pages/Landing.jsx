import s from "./Landing.module.css";
import { Link } from "react-router-dom";
import img from "../imgs/dogPaw-logo.png";

const Landing = () => {
  return (
    <div className={s.container}>
      <div className={`${s.div} ${s.mainDiv}`}>
        <img src={img} className={s.img} alt="DogPaw Logo" />
        <h1 className={s.title}>DogPaw</h1>
        <h2>Dog's breeds database</h2>
        <p>Find the info about all dog's breeds, and create your owns!</p>
        <Link to="/home" className={s.startButton}>
          <div className='primaryButton'>START</div>
        </Link>
      </div>
      <div className={s.div}></div>
    </div>
  );
};

export default Landing;
