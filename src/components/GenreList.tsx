import { GatheredGenres, Genre } from "@/hooks/useGames";
import {
  Button,
  HStack,
  Image,
  Link,
  List,
  Spinner,
  Text,
} from "@chakra-ui/react";

interface Props {
  genres: GatheredGenres;
  error: string;
  isLoadingGenres: boolean;
  onSelectGenre: (genre: string) => void;
}

const GenreList = ({
  genres,
  error,
  isLoadingGenres,
  onSelectGenre,
}: Props) => {
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
            <Link
              onClick={() => onSelectGenre(genre)}
              variant="plain"
              href="#"
              fontSize="lg"
            >
              {genre}
            </Link>
          </HStack>
        </List.Item>
      ))}
    </List.Root>
  );
};

export default GenreList;
