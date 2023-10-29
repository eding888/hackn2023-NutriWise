import { useState, SyntheticEvent, useEffect } from "react";
import { Flex, Heading, Box, Input, FormControl, Button, UnorderedList, ListItem, Image } from "@chakra-ui/react";
import { getUserData, createBreakfast, createLunch, createDinner, createSnack } from "./utils/Routing";
import NavBar from "./components/NavBar";
const Dashboard = () => {
  const [breakfast, setBreakfast] = useState([""]);
  const [lunch, setLunch] = useState([""]);
  const [dinner, setDinner] = useState([""]);
  const [snacks, setSnacks] = useState([""]);

  const [newBreakfast, setNewBreakfast] = useState("");
  const [newLunch, setNewLunch] = useState("");
  const [newDinner, setNewDinner] = useState("");
  const [newSnack, setNewSnack] = useState("");

  const fetchUserData = async () => {
    const data = await getUserData();
    return data;
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUserData();
      console.log(data);
      const breakfastS = data.breakfast;
      const lunchS = data.lunch;
      const dinnerS = data.dinner;
      const snacksS = data.snacks;

      if(breakfastS) {
        setBreakfast(breakfastS);
      }
      if(lunchS) {
        setLunch(lunchS);
      }
      if(dinnerS) {
        setDinner(dinnerS);
      }
      if(snacksS) {
        setSnacks(snacksS);
      }
    };
    fetchData();
  }, []);

  const addBreakfast = async (event: SyntheticEvent) => {
    event.preventDefault();
    await createBreakfast(newBreakfast);
    setBreakfast(breakfast.concat(newBreakfast));
  }
  const addLunch = async (event: SyntheticEvent) => {
    event.preventDefault();
    await createLunch(newLunch);
    setLunch(lunch.concat(newLunch));
  }
  const addDinner = async (event: SyntheticEvent) => {
    event.preventDefault();
    await createDinner(newDinner);
    setDinner(dinner.concat(newDinner));
  }
  const addSnack = async (event: SyntheticEvent) => {
    event.preventDefault();
    await createSnack(newSnack);
    setSnacks(snacks.concat(newSnack));
  }
  const handleBreakfastForm = (event: SyntheticEvent): void => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    setNewBreakfast(target.value);
  };
  const handleLunchForm = (event: SyntheticEvent): void => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    setNewLunch(target.value);
  };
  const handleDinnerForm = (event: SyntheticEvent): void => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    setNewDinner(target.value);
  };
  const handleSnackForm = (event: SyntheticEvent): void => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    setNewSnack(target.value);
  };
  return(
    <>
      <NavBar></NavBar>
      <Flex height='calc(100vh - 78px)'justifyContent="center" alignItems="center" gap = "30px">
        <Box>
        <Heading mb = '3'>Today's Diet</Heading>
        <Flex width='500px' wrap='wrap' gap='30px'>
          <Flex direction="column">
            <Flex alignItems='center'justifyContent='center' gap='10px'>
              <Image
                src= "https://cdn-icons-png.flaticon.com/512/4825/4825292.png"
                width="40px"
                height="40px"
              />
              <Heading size='lg'>Breakfast</Heading>
            </Flex>
            <Flex mt = '2' w='200px' h='200px' border="3px inset"borderRadius='7px' justifyContent='center'>
              <UnorderedList>
              {
                breakfast.map(food => {
                  return(
                    <ListItem>{food}</ListItem>
                  );
                })
              }
              </UnorderedList>
            </Flex>
            <form onSubmit={addBreakfast}>
              <FormControl mt = '2'>
                <Input w="200px" onChange={handleBreakfastForm}>
                </Input>
              </FormControl>
              <Button boxShadow='md' colorScheme='red' type='submit' mt = '2' w = "200px">Add</Button>
            </form>
          </Flex>

          <Flex direction="column">
            <Flex alignItems='center'justifyContent='center' gap='10px'>
              <Image
                src= "https://cdn-icons-png.flaticon.com/512/4253/4253239.png"
                width="40px"
                height="40px"
              />
              <Heading size='lg'>Lunch</Heading>
            </Flex>
            <Flex mt = '2' w='200px' h='200px' border="3px inset" borderRadius='7px' justifyContent='center'>
              <UnorderedList>
              {
                lunch.map(food => {
                  return(
                    <ListItem>{food}</ListItem>
                  );
                })
              }
              </UnorderedList>
            </Flex>
            <form onSubmit={addLunch}>
              <FormControl mt = '2'>
                <Input w="200px" onChange={handleLunchForm}>
                </Input>
              </FormControl>
              <Button boxShadow='md' colorScheme='red' type='submit' mt = '2' w = "200px">Add</Button>
            </form>
          </Flex>

          <Flex direction="column">
            <Flex alignItems='center'justifyContent='center' gap='10px'>
              <Image
                src= "https://cdn-icons-png.flaticon.com/512/3480/3480720.png"
                width="40px"
                height="40px"
              />
              <Heading size='lg'>Dinner</Heading>
            </Flex>
            <Flex mt = '2' w='200px' h='200px' border="3px inset"borderRadius='7px' justifyContent='center'>
              <UnorderedList>
              {
                dinner.map(food => {
                  return(
                    <ListItem>{food}</ListItem>
                  );
                })
              }
              </UnorderedList>
            </Flex>
            <form onSubmit={addDinner}>
              <FormControl mt = '2'>
                <Input w="200px" onChange={handleDinnerForm}>
                </Input>
              </FormControl>
              <Button boxShadow='md' colorScheme='red' type='submit' mt = '2' w = "200px">Add</Button>
            </form>
          </Flex>

          <Flex direction="column">
            <Flex alignItems='center'justifyContent='center' gap='10px'>
              <Image
                src= "https://cdn-icons-png.flaticon.com/512/2553/2553691.png"
                width="40px"
                height="40px"
              />
              <Heading size='lg'>Snacks</Heading>
            </Flex>
            <Flex mt = '2' w='200px' h='200px' border="3px inset"borderRadius='7px' justifyContent='center'>
              <UnorderedList>
              {
                snacks.map(food => {
                  return(
                    <ListItem>{food}</ListItem>
                  );
                })
              }
              </UnorderedList>
            </Flex>
            <form onSubmit={addSnack}>
              <FormControl mt = '2'>
                <Input w="200px" onChange={handleSnackForm}>
                </Input>
              </FormControl>
              <Button boxShadow='md' colorScheme='red' type='submit' mt = '2' w = "200px">Add</Button>
            </form>
          </Flex>
        </Flex>
        <Button boxShadow='md' colorScheme='blue' mt='3' w='86%'>Get Feedback for Today</Button>
        </Box>
        <Box>
          <Heading size='md' mt = '3'>Suggested Nutrients</Heading>
          <Flex mt = '2' w='290px' h='200px' border="3px inset"borderRadius='7px' justifyContent='center'>

          </Flex>
          <Heading size='md' mt='3'>Suggested Foods</Heading>
          <Flex mt = '2' w='290px' h='200px' border="3px inset"borderRadius='7px' justifyContent='center'>

          </Flex>

          <Heading size='md' mt = '3'>Foods to Avoid</Heading>
          <Flex mt = '2' w='290px' h='200px' border="3px inset"borderRadius='7px' justifyContent='center'>

          </Flex>
          <Button boxShadow='md' colorScheme='orange' mt='3' w='100%'>Configure My Feedback</Button>
        </Box>
      </Flex>
    </>
  )
}

export default Dashboard;