import { Link } from "react-router-dom";
import s from './PrimaryButton.module.css';

const PrimaryButton = ({to, text}) => {
  return (
    <Link to={to} className={s.startButton}>
      <div className="primaryButton">{text}</div>
    </Link>
  );
};

export default PrimaryButton;
