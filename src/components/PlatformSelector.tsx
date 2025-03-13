import {
  Button,
  Menu,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@chakra-ui/react";

const PlatformSelector = () => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button variant="outline" size="sm">
          Platforms
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem value="new-txt">Playstation</MenuItem>
        <MenuItem value="new-file">Xbox</MenuItem>
        <MenuItem value="new-win">Windows</MenuItem>
        <MenuItem value="open-file">Linux</MenuItem>
        <MenuItem value="export">Android</MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};

export default PlatformSelector;
