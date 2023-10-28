import { Box, Flex, keyframes, Heading, Image } from "@chakra-ui/react"
import NavBar from "./components/NavBar"
function App() {
  const moveLeft = keyframes`
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-500px);
    }
  `;

  const moveRight = keyframes`
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(500px);
    }
  `;

  return (
    <>
      <NavBar></NavBar>
      <Flex height='calc(100vh - 78px)' justifyContent="center" alignItems="center">
        <Flex id="landing-login">
          <Box width="500px" height="600px">
            <Flex direction="column" justifyContent='center' alignItems='center' height='100%'>
              <Heading>Rediscover your nutrition.</Heading>
              <Heading mb="8">Try NutriWise for free!</Heading>
              <Image
                src= "https://cdn-icons-png.flaticon.com/512/4080/4080032.png"
                width="200px"
              />
            </Flex>
          </Box>
          <Box width="500px" height="600px" backgroundColor="red">

          </Box>
        </Flex>
      </Flex>
    </>
  )
}

export default App
