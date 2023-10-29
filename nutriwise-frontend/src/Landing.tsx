import { SyntheticEvent, useState } from "react";
import { Box, Flex, keyframes, Heading, Image, FormControl, Input, FormLabel, Button } from "@chakra-ui/react"
import NavBar from "./components/NavBar"
import { loginRequest, signUpRequest } from "./utils/Routing";
import { useNavigate } from "react-router-dom";
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

  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleSignUpEmail = (event: SyntheticEvent): void => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    setSignUpEmail(target.value);
  };

  const handleSignUpPassword = (event: SyntheticEvent): void => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    setSignUpPassword(target.value);
  };

  const handleLoginEmail = (event: SyntheticEvent): void => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    setLoginEmail(target.value);
  };

  const handleLoginPassword = (event: SyntheticEvent): void => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    setLoginPassword(target.value);
  };

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
  const navigate = useNavigate();
  const execLogin = async (event: SyntheticEvent) => {
    event.preventDefault();
    const res = await loginRequest(loginEmail, loginPassword);
    if(res == "OK") {
      navigate('/dashboard')
    }
  }

  const execSignUp = async (event: SyntheticEvent) => {
    event.preventDefault();
    const res = await signUpRequest(signUpEmail, signUpPassword);
    if(res == "OK") {
      navigate('/dashboard')
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
              <form onSubmit={execSignUp}>
                <FormControl mt='3'>
                  <FormLabel>Email</FormLabel>
                  <Input onChange = {handleSignUpEmail} ></Input>
                </FormControl>
                <FormControl mt='2'>
                  <FormLabel>Password</FormLabel>
                  <Input type='password' onChange = {handleSignUpPassword}></Input>
                </FormControl>
                <FormControl mt='2'>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input type='password'></Input>
                </FormControl>
                <Flex mt = '10' justifyContent='center' gap ="10px">
                  <Button type = "submit" colorScheme="transparent" border="1px">Register</Button>
                </Flex>
              </form>

            </Flex>
            ) :
            <Flex direction="column" justifyContent='center' alignItems='center' height='100%'>
              <Heading>Login</Heading>
              <form onSubmit={execLogin}>
                <FormControl mt='3'>
                  <FormLabel>Email</FormLabel>
                  <Input onChange = {handleLoginEmail}></Input>
                </FormControl>
                <FormControl mt='2'>
                  <FormLabel>Password</FormLabel>
                  <Input onChange = {handleLoginPassword}></Input>
                </FormControl>
                <Flex mt = '10' justifyContent='center' gap ="10px">
                  <Button type='submit' colorScheme="transparent" border="1px">Login</Button>
                </Flex>
              </form>

            </Flex>
            }

          </Box>

        </Flex>
      </Flex>
    </>
  )
}

export default Landing;
