import { Image, useColorModeValue, useColorMode, IconButton, Flex, Box } from "@chakra-ui/react"
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

function NavBar() {
  const darkAndLightModeColor = useColorModeValue('white', 'gray.800');
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Flex width="100%" boxShadow='sm' pl="10" pr="10" pt="2" pb="2" backgroundColor={darkAndLightModeColor} alignItems="center" justifyContent="space-between">
        <Image
          src= {colorMode =="light" ? "https://i.ibb.co/2K2mQtm/logo-no-background.png" : "https://i.ibb.co/dMHWVVd/nutriwise-high-resolution-logo-transparent-1.png"}
          width="200px"
        />
        <IconButton
          colorScheme='red'
          aria-label='toggle dark/light mode'
          icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />} // Toggle sun/moon icon based on color mode
          onClick={toggleColorMode}
        />
      </Flex>
    </>
  )
}

export default NavBar
