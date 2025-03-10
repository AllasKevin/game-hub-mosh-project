import {
  Button,
  ButtonGroup,
  ChakraProvider,
  defaultSystem,
  HStack,
} from "@chakra-ui/react";

function App() {
  return (
    <div>
      <Button
        _active={{ bg: "blue" }} // custom active state styling
        colorPalette="blue"
      >
        Click me
      </Button>
    </div>
  );
}

export default App;
