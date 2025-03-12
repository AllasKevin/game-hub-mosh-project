import { Game } from "@/hooks/useGames";
import { Card, CardBody, Heading, HStack, Image, Text } from "@chakra-ui/react";
import React from "react";
import PlatformIconList from "./PlatformIconList";
import CriticScore from "./CriticScore";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => (
  <Card.Root>
    <Image src={game.background_image}></Image>
    <Card.Body>
      <Card.Header fontSize="2xl">{game.name}</Card.Header>
      <HStack justifyContent={"space-between"}>
        <PlatformIconList
          platforms={game.platforms.map((p) => p.platform)}
        ></PlatformIconList>
        <CriticScore score={game.metacritic} />
      </HStack>
    </Card.Body>
  </Card.Root>
);

export default GameCard;
