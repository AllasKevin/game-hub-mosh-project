import { Game } from "@/hooks/useGames";
import { Card, CardBody, Heading, Image } from "@chakra-ui/react";
import React from "react";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => (
  <Card.Root borderRadius={10} overflow="hidden">
    <Image src={game.background_image}></Image>
    <Card.Body>
      <Card.Header fontSize="2xl">{game.name}</Card.Header>
    </Card.Body>
  </Card.Root>
);

export default GameCard;
