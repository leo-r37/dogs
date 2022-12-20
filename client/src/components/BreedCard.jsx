import s from "./BreedCard.module.css";

const BreedCard = ({ name, image, weight, temperaments }) => {
  return (
    <div className={s.container}>
      <div className={s.imageContainer}>
        <img src={image} className={s.image} alt="dog" />
      </div>
      <div className={s.infoContainer}>
        <h2>{name}</h2>
        <p>
          <b>Weight: </b>
          {weight} kg
        </p>
        <div className={s.tempContainer}>
          {temperaments.map((t) => {
            return <p className={s.temp}>{t}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default BreedCard;
