import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import { RouteComponentProps } from "react-router";
import IMovies from "../../model/IMovies";
import { getMovies } from "../../services/movies";
import { LoadingStatus } from "../../services/types";
import LoadingIndicator from "../common/LoadingIndicator";
import NoDataMatched from "../global/NoDataMatched";
import MovieListItem from "./MovieListItem";
import "./search-bar.css";

type State = {
  status: LoadingStatus;
  movies?: IMovies[];
  moviesToShow?: IMovies[];
  error?: Error;
  searchString: string;
};

type Props = {
  moviesCategory: string;
};

class MoviesList extends Component<RouteComponentProps<Props>, State> {
  state: State = {
    status: "LOADING",
    searchString: "",
  };

  updateValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;

    this.setState(
      () => {
        return {
          searchString: value,
        };
      },
      () => {
        this.searchMovie(this.state.searchString);
      }
    );
  };

  searchMovie(searchString: string) {
    this.setState({
      status: "LOADING",
    });

    const moviesToShow = this.state.movies?.filter((x) => {
      return x.title.toLowerCase().includes(searchString.toLowerCase());
    });
    this.setState({
      status: "LOADED",
      moviesToShow,
    });
  }

  removeMovieFromFavourite = (title: string) => {
    this.setState({
      status: "LOADING",
    });

    const moviesToShow = this.state.moviesToShow?.filter(
      (movie) => movie.title !== title
    );

    this.setState({
      status: "LOADED",
      moviesToShow,
    });
  };

  render() {
    const { status, moviesToShow, error, searchString } = this.state;

    let el;

    switch (status) {
      case "LOADING":
        el = (
          <LoadingIndicator
            size="large"
            message="We are Fetching the List of Movies. Please wait...."
          />
        );
        break;
      case "LOADING_ERROR":
        let msg = error?.message ?? "";

        if (msg?.indexOf("404") > -1) {
          el = <NoDataMatched />;
        } else {
          el = <Alert variant="danger">{error?.message}</Alert>;
        }
        break;
      case "LOADED":
        el = (
          <>
            <div className="container">
              <input
                type="search"
                placeholder="Search movie..."
                value={searchString}
                onChange={this.updateValue}
              />
              <div className="search"></div>
            </div>
            <Row xs={2} md={3} lg={5}>
              {moviesToShow && moviesToShow.length !== 0 ? moviesToShow && moviesToShow.map((movies, idx) => (
                <Col key={idx} className="d-flex align-items-stretch my-3">
                  <MovieListItem
                    movies={movies}
                    path={this.props.match.params.moviesCategory}
                    onRemove={this.removeMovieFromFavourite}
                  />
                </Col>
              )) : <div style={{ position: 'absolute', alignItems: 'center', top: '50%', left: '53%', transform: 'translate(-50%, -50%)', fontWeight: 'Bold', fontSize: '160%' }}>No data found...</div>}
            </Row>
          </>
        );


        break;
      default:
        break;
    }

    return el;
  }



  async componentDidUpdate(prevProps: RouteComponentProps<Props>) {
    if (
      this.props.match.params.moviesCategory !==
      prevProps.match.params.moviesCategory
    ) {
      await this.reloadMovieList();
    }
  }



  reloadMovieList = async () => {
    this.setState({
      status: "LOADING",
    });

    try {
      const movies = await getMovies(this.props.match.params.moviesCategory);
      const moviesToShow = movies;
      this.setState({
        status: "LOADED",
        movies,
        moviesToShow,
      });
    } catch (error) {
      this.setState({
        status: "LOADING_ERROR",
        error: error as Error,
      });
    }
  };

  async componentDidMount() {
    await this.reloadMovieList();
  }
}

export default MoviesList;
