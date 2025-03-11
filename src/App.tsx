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

function App() {
  const isLgOrLarger = useBreakpointValue({ base: false, lg: true });
  const asideBg = useColorModeValue("yellow.500", "yellow.200");
  const asideColor = useColorModeValue("white", "gray.800");

  const mainBg = useColorModeValue("blue.500", "blue.200");
  const mainColor = useColorModeValue("white", "gray.800");

  return (
    <Grid
      bg="myColor"
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
    >
      <GridItem area="nav">
        <NavBar></NavBar>
      </GridItem>{" "}
      <Show when={isLgOrLarger}>
        <GridItem area="aside" /*bg={asideBg} color={asideColor}*/>
          Aside
        </GridItem>{" "}
      </Show>
      <GridItem area="main" /*bg={mainBg} color={mainColor}*/>
        <GameGrid />
      </GridItem>
    </Grid>
  );
}

export default App;
