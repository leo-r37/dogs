import { Link } from "react-router-dom";
import s from './PrimaryButton.module.css';

const PrimaryButton = ({to, text, onClick}) => {
  return (
    <Link to={to} onClick={onClick} className={s.startButton}>
      <div className="primaryButton">{text}</div>
    </Link>
  );
};

export default PrimaryButton;
