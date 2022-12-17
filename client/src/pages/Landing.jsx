import s from "./Landing.module.css";
import img from "../imgs/dogPaw-logo.png";
import PrimaryButton from "../components/PrimaryButton";

const Landing = () => {
  return (
    <div className={s.container}>
      <div className={`${s.div} ${s.mainDiv}`}>
        <img src={img} className={s.img} alt="DogPaw Logo" />
        <h1 className={s.title}>DogPaw</h1>
        <h2>Dog's breeds database</h2>
        <p>Find the info about all dog's breeds, and create your owns!</p>
        <PrimaryButton to='/breeds' text='START'/>
      </div>
      <div className={s.div}></div>
    </div>
  );
};

export default Landing;
