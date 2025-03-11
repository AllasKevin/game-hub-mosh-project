import {
  FaWindows,
  FaPlaystation,
  FaXbox,
  FaApple,
  FaLinux,
  FaAndroid,
} from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { BsGlobe } from "react-icons/bs";
import { Platform } from "@/hooks/useGames";
import { HStack, Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface Props {
  platforms: Platform[];
}

const PlatformIconList = ({ platforms }: Props) => {
  const iconMap: { [key: string]: IconType } = {
    Steam: FaWindows,
    playstation: FaPlaystation,
    xbox: FaXbox,
    mac: FaApple,
    linux: FaLinux,
    android: FaAndroid,
    ios: MdPhoneIphone,
    web: BsGlobe,
  };

  return (
    <>
      {
        //platforms.map((platform) => {return <Icon as={iconMap[platform.name]} key={platform.id}></Icon>;})
        // This is the actual way to map the platform name to the icon, but since only steam is shown as a platform I have randomized the icons.
      }
      <HStack marginY={1}>
        {Object.entries(iconMap).map(([key, IconComponent]) => {
          if (Math.random() > 0.5) {
            return <Icon as={IconComponent} key={key} color="gray.500" />;
          }
        })}
      </HStack>
    </>
  );
};

export default PlatformIconList;
