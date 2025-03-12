import useGames, { Game } from "@/hooks/useGames";
import { SimpleGrid, Skeleton, Text } from "@chakra-ui/react";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";

interface Props {
  games: Game[];
  error: string;
  isLoading: boolean;
}

const GameGrid = ({ games, error, isLoading }: Props) => {
  const skeletons = [1, 2, 3, 4, 5, 6];

  return (
    <>
      {error && <Text color={"red"}>{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        padding="10px"
        gap="10px"
      >
        {isLoading &&
          skeletons.map((skeleton) => (
            <GameCardContainer key={Math.random()}>
              <GameCardSkeleton key={skeleton} />
            </GameCardContainer>
          ))}
        {games.map((game) => (
          <GameCardContainer key={Math.random()}>
            {" "}
            <GameCard key={game.id * Math.random()} game={game} />
          </GameCardContainer>
        ))}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
