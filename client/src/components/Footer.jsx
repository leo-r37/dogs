import s from "./Footer.module.css";
import logoLinkedIn from "../imgs/linkedin.png";
import logoGitHub from "../imgs/github.png";

const Footer = () => {
  return (
    <div className={s.container}>
      DogPaw - Dog's breeds database - Made by Leandro Rocha
      <a
        href="https://www.linkedin.com/in/leandro-ezequiel-rocha/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={logoLinkedIn} className={s.logo} alt="Logo Linkedin" />
      </a>

      <a
        href="https://github.com/leo-r37"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={logoGitHub} className={s.logo} alt="Logo GitHub" />
      </a>
    </div>
  );
};

export default Footer;
