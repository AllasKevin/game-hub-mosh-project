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

function App() {
  const isLgOrLarger = useBreakpointValue({ base: false, lg: true });

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
    >
      <GridItem area="nav" bg="green">
        Nav
      </GridItem>{" "}
      <Show when={isLgOrLarger}>
        <GridItem area="aside" bg="gold">
          Aside
        </GridItem>{" "}
      </Show>
      <GridItem area="main" bg="dodgerblue">
        Main
      </GridItem>
    </Grid>
  );
}

export default App;
