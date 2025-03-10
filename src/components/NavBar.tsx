import { HStack, Image, Text } from "@chakra-ui/react";
import myLogo from "../assets/logo.webp";
const NavBar = () => {
  return (
    <HStack>
      <Image src={myLogo} boxSize="45px"></Image>
      <Text>NavBar</Text>
    </HStack>
  );
};

export default NavBar;
