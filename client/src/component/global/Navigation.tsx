import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const NavigationMenu = () => {
  return (
    <Navbar className="me-2 " bg="light" expand="lg">
      <Navbar.Brand href="/">
        <FontAwesomeIcon icon={faFilm} className="ms-4 me-2" />
        Movies<span style={{ color: "#02a8c7" }}>Hub</span>
      </Navbar.Brand>
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="flex-end" id="basic-navbar-nav">
          <Nav
            className="me-auto 
                "
          >
            <NavLink activeStyle={{ color: '#02a8c7' }} style={{ paddingRight: '20px', paddingBottom: '14px', textDecoration: 'None', color: 'black' }} to="/movies-in-theaters">
              Movies in Theaters
            </NavLink>
            <NavLink activeStyle={{ color: '#02a8c7', }} style={{ paddingRight: '20px', paddingBottom: '14px', textDecoration: 'None', color: 'black' }} to="/movies-coming">
              Coming Soon
            </NavLink>
            <NavLink activeStyle={{ color: '#02a8c7', }} style={{ paddingRight: '20px', paddingBottom: '14px', textDecoration: 'None', color: 'black' }} to="/top-rated-india">
              Top Rated Indian Movies
            </NavLink>
            <NavLink activeStyle={{ color: '#02a8c7', }} style={{ paddingRight: '20px', paddingBottom: '14px', textDecoration: 'None', color: 'black' }} to="/top-rated-movies">
              Top Rated World Wide Movies
            </NavLink>
            <NavLink activeStyle={{ color: '#02a8c7', }} style={{ paddingRight: '20px', paddingBottom: '14px', textDecoration: 'None', color: 'black' }} to="/favourite">Favourites</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationMenu;
