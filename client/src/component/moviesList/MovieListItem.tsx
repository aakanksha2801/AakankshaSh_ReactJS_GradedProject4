import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { toast } from "react-toastify";
import IMovies from "../../model/IMovies";
import {
  addMovie,
  removeMovieById,
  getHigestMovieId,
  getMovieByTitle,
} from "../../services/movies";
import "../App.css";

type Props = {
  movies: IMovies;
  path: string;
  onRemove: (title: string) => void;
};

const MovieListItem = ({ movies, path, onRemove }: Props) => {
  const toastTimeout = 1800;
  const isFavouritePage = path === "favourite";

  const { title, poster } = movies;

  var toPath = `${path}/${title}`;

  const [isAdded, setIsAdded] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  const addMovieToFavourite = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      const movieByTitle = await getMovieByTitle("favourite", movies.title);
      if (movieByTitle !== null) {
        toast.error("Already added to Favourites...", {
          autoClose: toastTimeout,
        });
        return;
      }

      const highestId = await getHigestMovieId("favourite");
      movies.id = highestId + 1;
      await addMovie("favourite", movies);
      toast.success("Successfully added to Favourites...", {
        autoClose: toastTimeout,
      });

      // Apply the 'added' class to the button and change heart color to yellow
      setIsAdded(true);
    } catch (errormsg: any) {
      toast.error("Not added to Favourites...", { autoClose: toastTimeout });
    }
  };

  const removeMovieFromFavourite = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      if (movies.id === null) {
        toast.warn(
          "Cannot find the Movie Id to remove from the favourite list..."
        );
      }
      const data = await removeMovieById("favourite", movies.id);
      toast.success("Successfully removed from Favourites...", {
        autoClose: toastTimeout,
      });

      // Apply the 'removed' class to the button and change heart color to red
      setIsRemoved(true);

      onRemove(movies.title);
    } catch (errormsg: any) {
      toast.error("Unable to remove from Favourites...", {
        autoClose: toastTimeout,
      });
    }
  };

  const handleCardClick = () => {
    // If the card is clicked, reset the button effects
    setIsAdded(false);
    setIsRemoved(false);

    const cardElement = document.getElementById(`movie-card-${movies.id}`);
    if (cardElement) {
      cardElement.classList.add("clicked");
      setTimeout(() => {
        cardElement.classList.remove("clicked");
      }, 300);
    }
  };

  return (
    <Card
      id={`movie-card-${movies.id}`}
      className={`my-3 zoom my-card w-100 ${isAdded ? "added" : ""} ${isRemoved ? "removed" : ""
        }`}
      style={{ width: "20rem" }}
      onClick={handleCardClick}
    >
      <a href={toPath}>
        <Card.Img
          className="card-img"
          variant="top"
          src={`${process.env.REACT_APP_API_BASE_URL}/img/${poster}`}
        />
      </a>
      <Card.Body className="text-center">
        <Card.Title>
          <div>{title}</div>
        </Card.Title>
        <Card.Text className="text-center">
          <div className="button-container">
            <button
              id="button"
              className={`button ${isFavouritePage ? "added" : "removed"}`}
              onClick={
                isFavouritePage ? removeMovieFromFavourite : addMovieToFavourite
              }
            >
              {isFavouritePage ? "Remove from favourite" : "Add to favourite"}
              <div className="button__horizontal"></div>
              <div className="button__vertical"></div>
            </button>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MovieListItem;
