import { GatheredGenres } from "@/hooks/useGames";
import { HStack, Image, List, Text } from "@chakra-ui/react";

interface Props {
  genres: GatheredGenres;
  error: string;
  isLoading: boolean;
}

const GenreList = ({ genres, error, isLoading }: Props) => {
  if (!genres) {
    return <div>Loading...</div>;
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
