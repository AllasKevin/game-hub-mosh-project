import { HStack, Image, Text } from "@chakra-ui/react";
import myLogo from "../assets/logo.webp";
import { ColorModeButton } from "./ui/color-mode";

const NavBar = () => {
  return (
    <HStack>
      <Image src={myLogo} boxSize="45px"></Image>
      <Text>NavBar</Text>
      <ColorModeButton>toggle</ColorModeButton>
    </HStack>
  );
};

export default NavBar;
