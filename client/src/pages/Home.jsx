import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <p>Home</p>
      <button className={`primaryButton`}>
        <Link to="/">
          Landing
        </Link>
      </button>
    </div>
  );
};

export default Home;
