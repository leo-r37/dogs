import "./App.css";
import { Route, Switch } from "react-router-dom";

import Landing from "./pages/Landing.jsx";
import Breeds from "./pages/Breeds.jsx";
import CreateBreed from "./pages/CreateBreed.jsx";
import BreedDetail from "./pages/BreedDetail.jsx";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/create" component={CreateBreed} />
        <Route exact path="/breeds" component={Breeds} />
        <Route path="/breeds/:id" component={BreedDetail} />        
      </Switch>
    </div>
  );
}

export default App;
