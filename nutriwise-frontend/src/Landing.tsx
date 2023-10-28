import { useState } from "react";
import { Box, Flex, keyframes, Heading, Image, FormControl, Input, FormLabel, Button } from "@chakra-ui/react"
import NavBar from "./components/NavBar"
function Landing() {
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

  const moveRightBack = keyframes`
    from {
      transform: translateX(500px);
    }
    to {
      transform: translateX(0)px;
    }
  `;

  const moveLeftBack = keyframes`
    from {
      transform: translateX(-500px);
    }
    to {
      transform: translateX(0)px;
    }
  `;

  const wiggle = keyframes`
    0%{
      transform: rotate(0deg);
    }
    25%{
      transform: rotate(3deg);
    }
    50% {
      transform: rotate(0deg);
    }
    75%{
      transform: rotate(-3deg);
    }
    100%{
      transform: rotate(0deg);
    }
  `;

  const [login, setLogin] = useState(false);
  const [leftAnim, setLeftAnim] = useState("");
  const [rightAnim, setRightAnim] = useState("");

  const switchLogin = () => {
    setLogin(!login);
    if(leftAnim === "") {
      setLeftAnim(`${moveRight} 0.7s forwards ease-in-out`);
      setRightAnim(`${moveLeft} 0.7s forwards ease-in-out`);
    } else {
      if(login) {
        setLeftAnim(`${moveRightBack} 0.7s forwards ease-in-out`);
        setRightAnim(`${moveLeftBack} 0.7s forwards ease-in-out`);
      } else {
        setLeftAnim(`${moveRight} 0.7s forwards ease-in-out`);
        setRightAnim(`${moveLeft} 0.7s forwards ease-in-out`);
      }
    }

  }
  return (
    <>
      <NavBar></NavBar>
      <Flex height='calc(90vh - 78px)'justifyContent="center" alignItems="center">
        <Flex id="landing-login" boxShadow='lg'>
          <Box width="500px" height="600px" animation={leftAnim}>
            <Flex direction="column" justifyContent='center' alignItems='center' height='100%'>
              <Heading>{!login ? "Rediscover Your Nutrition." : "Welcome Back!"}</Heading>
              <Heading mb="8">{!login ? "Try NutriWise For Free!" : ""}</Heading>
              <Image
                src= "https://cdn-icons-png.flaticon.com/512/4080/4080032.png"
                width="200px"
                animation={`${wiggle} 3s infinite`}
              />
              <Button mt = '8' color='black' colorScheme="transparent" onClick={switchLogin}>{!login ? "Have an account?" : "Register?"}</Button>
            </Flex>
          </Box>

          <Box width="500px" height="600px"  animation = {rightAnim} bgGradient='linear(to-l, #f95f5f, #f28d60)'>
            {
            !login
            ? (
            <Flex direction="column" justifyContent='center' alignItems='center' height='100%'>
              <Heading>Sign Up</Heading>
              <form>
                <FormControl mt='3'>
                  <FormLabel>Email</FormLabel>
                  <Input></Input>
                </FormControl>
                <FormControl mt='2'>
                  <FormLabel>Password</FormLabel>
                  <Input></Input>
                </FormControl>
                <FormControl mt='2'>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input></Input>
                </FormControl>
              </form>
              <Flex mt = '10' justifyContent='center' gap ="10px">
                <Button colorScheme="transparent" border="1px">Register</Button>
              </Flex>
            </Flex>
            ) :
            <Flex direction="column" justifyContent='center' alignItems='center' height='100%'>
              <Heading>Login</Heading>
              <form>
                <FormControl mt='3'>
                  <FormLabel>Email</FormLabel>
                  <Input></Input>
                </FormControl>
                <FormControl mt='2'>
                  <FormLabel>Password</FormLabel>
                  <Input></Input>
                </FormControl>
              </form>
              <Flex mt = '10' justifyContent='center' gap ="10px">
                <Button colorScheme="transparent" border="1px">Login</Button>
              </Flex>
            </Flex>
            }

          </Box>

        </Flex>
      </Flex>
    </>
  )
}

export default Landing;
