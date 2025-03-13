import { GatheredGenres } from "@/hooks/useGames";
import { HStack, Image, List, Spinner, Text } from "@chakra-ui/react";

interface Props {
  genres: GatheredGenres;
  error: string;
  isLoadingGenres: boolean;
}

const GenreList = ({ genres, error, isLoadingGenres }: Props) => {
  if (!genres || isLoadingGenres) {
    return <Spinner />;
  } else if (error) {
    return null;
  }

  return (
    <List.Root listStyleType="none">
      {[...genres.genres].map((genre, index) => (
        <List.Item paddingBottom={2} key={Math.random()}>
          <HStack>
            <Image boxSize="32px" borderRadius={8} src={genres.images[index]} />
            <Text fontSize="lg">{genre}</Text>
          </HStack>
        </List.Item>
      ))}
    </List.Root>
  );
};

export default GenreList;
