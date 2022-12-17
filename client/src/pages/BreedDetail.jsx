
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const BreedDetail = () => {
  let { id } = useParams();
  return (
    <div>
      <Navbar />
      <p>BreedDetail for breed with ID : {id}</p>
    </div>
  );
};

export default BreedDetail;
