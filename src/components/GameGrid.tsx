import useGames, { Game } from "@/hooks/useGames";
import { SimpleGrid, Skeleton, Text } from "@chakra-ui/react";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";

interface Props {
  games: Game[];
  error: string;
  isLoadingGames: boolean;
  selectedGenre: string | null;
}

const GameGrid = ({ games, error, isLoadingGames, selectedGenre }: Props) => {
  const skeletons = [1, 2, 3, 4, 5, 6];

  return (
    <>
      {error && <Text color={"red"}>{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        padding="10px"
        gap="10px"
      >
        {isLoadingGames
          ? skeletons.map((skeleton) => (
              <GameCardContainer key={Math.random()}>
                <GameCardSkeleton key={skeleton} />
              </GameCardContainer>
            ))
          : games.map((game) => (
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
