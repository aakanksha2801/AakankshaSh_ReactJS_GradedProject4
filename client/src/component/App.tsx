import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./global/Navigation";
import Home from "./global/Home";

import "bootstrap/dist/css/bootstrap.min.css";
import MoviesList from "./moviesList/MoviesList";
import MoviesDetails from "./moviesDetails/MoviesDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/:moviesCategory/:path" component={MoviesDetails} />
          <div>
            <Navigation />
            <Route exact path="/:moviesCategory" component={MoviesList}></Route>
            <Route exact path="/" component={Home}></Route>
          </div>
        </Switch>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
