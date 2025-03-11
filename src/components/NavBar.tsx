import { HStack, Image, Text } from "@chakra-ui/react";
import myLogo from "../assets/logo.webp";
import { ColorModeButton } from "./ui/color-mode";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  return (
    <HStack justifyContent="space-between" padding="10px">
      <Image src={myLogo} boxSize="45px"></Image>
      <Text>NavBar</Text>
      <ColorModeSwitch></ColorModeSwitch>
    </HStack>
  );
};

export default NavBar;
