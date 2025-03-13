import {
  Button,
  ButtonGroup,
  ChakraProvider,
  defaultSystem,
  Grid,
  GridItem,
  HStack,
  Show,
  useBreakpointValue,
} from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import { ColorModeButton, useColorModeValue } from "./components/ui/color-mode";
import GameGrid from "./components/GameGrid";
import { BsFillAlarmFill } from "react-icons/bs";
import GenreList from "./components/GenreList";
import useGames, { Genre } from "./hooks/useGames";
import { useEffect, useState } from "react";

function App() {
  const isLgOrLarger = useBreakpointValue({ base: false, lg: true });
  const asideBg = useColorModeValue("yellow.500", "yellow.200");
  const asideColor = useColorModeValue("white", "gray.800");

  const mainBg = useColorModeValue("blue.500", "blue.200");
  const mainColor = useColorModeValue("white", "gray.800");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const { games, error, isLoadingGames, isLoadingGenres, gatheredGenres } =
    useGames(selectedGenre);

  return (
    <Grid
      bg="myColor"
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
    >
      <GridItem area="nav">
        <NavBar></NavBar>
      </GridItem>{" "}
      <Show when={isLgOrLarger}>
        <GridItem area="aside" paddingX={2} /*bg={asideBg} color={asideColor}*/>
          <GenreList
            selectedGenre={selectedGenre}
            genres={gatheredGenres}
            error={error}
            isLoadingGenres={isLoadingGenres}
            onSelectGenre={(genre) => setSelectedGenre(genre)}
          />
        </GridItem>{" "}
      </Show>
      <GridItem area="main" /*bg={mainBg} color={mainColor}*/>
        <GameGrid
          games={games}
          error={error}
          isLoadingGames={isLoadingGames}
          selectedGenre={selectedGenre}
        />
      </GridItem>
    </Grid>
  );
}

export default App;
