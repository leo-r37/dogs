import s from "./BreedCard.module.css";

const BreedCard = ({ name, image, weight, temperaments }) => {
  return (
    <div className={s.container}>
      <div className={s.imageContainer}>
        <img src={image} className={s.image} alt="dog" />
      </div>
      <div className={s.infoContainer}>
        <h2 className={name.length >= 22 ? s.h2 : null}>{name}</h2>
        <p>
          <b>Weight: </b>
          {weight} kg
        </p>
        <div className={s.tempContainer}>
          {temperaments.map((t, i) => {
            if (i > 4) return false;
            return (
              <p key={i} className={s.temp}>
                {t.name}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BreedCard;
