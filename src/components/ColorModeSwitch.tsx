import { HStack, Switch, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useColorMode } from "./ui/color-mode";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const [checked, setChecked] = useState(false);

  return (
    <HStack>
      <Switch.Root
        colorPalette={"green"}
        checked={colorMode === "dark"}
        onCheckedChange={toggleColorMode}
      >
        <Switch.HiddenInput />
        <Switch.Control />
        <Switch.Label>Dark Mode</Switch.Label>
      </Switch.Root>
    </HStack>
  );
};

export default ColorModeSwitch;
