import React, { useContext, useState } from "react";
import { Navbar, Form, FormControl, Button } from "react-bootstrap";
import { WeatherContext } from "../App";
import logo from "../assets/pngwing.com.png";

const MyNav = () => {
  const { getWeatherData } = useContext(WeatherContext);
  const [city, setCity] = useState("");

  const handleSearch = (e) => {
    e.preventDefault(); // Impedisce il comportamento predefinito del form (ricaricare la pagina)
    getWeatherData(city);
  };

  return (
    <Navbar
      bg="dark"
      expand="lg"
      variant="dark"
      className="justify-content-between"
    >
      <Navbar.Brand
        href="#"
        className="d-flex align-items-center mr-5 ml-5"
        onClick={() => window.location.reload()}
      >
        <img
          src={logo}
          width="80"
          height="80"
          className="d-inline-block align-top mr-2"
          alt="Logo"
        />
        <span className="h4">Wild Weather</span>
      </Navbar.Brand>

      <Form
        inline="true"
        className="d-flex justify-content-center mx-2"
        onSubmit={handleSearch}
      >
        <FormControl
          type="text"
          placeholder="Insert the desired city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button variant="primary" className="mx-2" type="submit">
          {" "}
          {/* Aggiunto type="submit" qui */}
          Search
        </Button>
      </Form>
    </Navbar>
  );
};

export default MyNav;
