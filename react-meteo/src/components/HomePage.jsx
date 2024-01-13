import React from 'react';
import { Card, Container } from 'react-bootstrap';

const HomePage = () => {
  return (
    <Container className="mt-5">
      <Card className="text-center">
        <Card.Header>
          <h1>Benvenuti su Wild Weather!</h1>
        </Card.Header>
        <Card.Body>
          <Card.Title>Esplora le previsioni del tempo</Card.Title>
          <Card.Text>
          Scopri previsioni meteorologiche accurate per le città di tutto il mondo.
             Inserisci semplicemente la città desiderata nella barra di ricerca per iniziare.
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">Inizia ora il tuo viaggio meteo!</Card.Footer>
      </Card>
    </Container>
  );
};

export default HomePage;