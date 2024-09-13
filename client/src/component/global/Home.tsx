import React from "react";
import "./home.css";

const Home = () => {
  return (
    <div className="home">
      <main>
        <section className="my-1">
          <p
            className="ms-3 font text-center"
            style={{ fontWeight: "bolder", fontSize: "32px" }}
          >
            <br />
            Welcome to the{" "}
            <a href="/" style={{ textDecoration: "none" }}>
              <span style={{ color: "black" }}>Movies</span><span style={{ color: "#02a8c7" }}>Hub</span>
            </a>{" "}
            App.
          </p>
          <hr />
          <p>Here you can</p>
          <ul style={{ fontWeight: "bold" }}>
            <li>
              Search Movies that are already in{" "}
              <a
                className="me-2"
                href="/movies-in-theaters"
                style={{ textDecoration: "none", color: "#7d4860" }}
              >
                Movies in Theaters,
              </a>
              <a
                className="me-2"
                href="/top-rated-india"
                style={{ textDecoration: "none", color: "#7d4860" }}
              >
                Top Rated Indian Movies,
              </a>
              <a
                className="me-2"
                href="/top-rated-movies"
                style={{ textDecoration: "none", color: "#7d4860" }}
              >
                Top Rated World Wide Movies.
              </a>
            </li>
            <br />
            <li>
              Search movies that will be{" "}
              <a
                className="me-2"
                href="/movies-coming"
                style={{ textDecoration: "none", color: "#7d4860" }}
              >
                Coming Soon,
              </a> 
              to your nearby Theaters.
            </li>
            <br />
            <li>Add your favorite movies in the{" "}
              <a
                className="me-2"
                href="/favourite"
                style={{ textDecoration: "none", color: "#7d4860" }}
              >
                Favourites,
              </a>  Movies List.</li>
          </ul>{" "}
          <br />
          <p>
            And enjoy the Experience on{" "}
            <a href="/" style={{ textDecoration: "none" }}>
              <span style={{ color: "black" }}>Movies</span><span style={{ color: "#02a8c7" }}>Hub</span>
            </a>{" "}
            .
          </p>
        </section>
      </main>
    </div>
  );
};

export default Home;
