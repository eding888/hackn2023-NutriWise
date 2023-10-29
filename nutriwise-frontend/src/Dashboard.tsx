import React,{ useState, SyntheticEvent, useEffect } from "react";
import { Flex, Heading, Box, Input, FormControl, Button, UnorderedList, ListItem, Image, useDisclosure, FormLabel } from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { getUserData, createBreakfast, createLunch, createDinner, createSnack, createConfiguraiton } from "./utils/Routing";
import { gptQueryJson, GptQuery } from './utils/GPT.ts';
import { FoodToAdd, FoodToRemove, MissingVitamin} from "./utils/ResultInterfaces.ts";

import NavBar from "./components/NavBar";
const Dashboard = () => {
  const [breakfast, setBreakfast] = useState([""]);
  const [lunch, setLunch] = useState([""]);
  const [dinner, setDinner] = useState([""]);
  const [snacks, setSnacks] = useState([""]);
  const [allergies, setAllergies] = useState("");
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [goal, setGoal] = useState("");
  const [medications, setMedications] = useState("");
  const [newBreakfast, setNewBreakfast] = useState("");
  const [newLunch, setNewLunch] = useState("");
  const [newDinner, setNewDinner] = useState("");
  const [newSnack, setNewSnack] = useState("");

  const [foodToAdd, setFoodToAdd] = useState([""]);
  const [foodToRemove, setFoodToRemove] = useState([""]);
  const [missingVitamins, setMissingVitamins] = useState([""]);

  const fetchUserData = async () => {
    const data = await getUserData();
    return data;
  }

  const fetchData = async () => {
    const data = await fetchUserData();
    console.log(data);
    const breakfastS = data.breakfast;
    const lunchS = data.lunch;
    const dinnerS = data.dinner;
    const snacksS = data.snacks;
    const allergiesS = data.allergies;
    const ageS = data.age;
    const weightS = data.weight;
    const heightS = data.height;
    const genderS = data.gender;
    const activityS = data.activity_level;
    const targetGoalS = data.target_nutr_goal;
    const medicationS = data.medications;

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
    if(allergiesS) {
      setAllergies(allergiesS);
    } else {
      setAllergies("");
    }
    if(ageS) {
      setAge(ageS);
    } else {
      setAge(0);
    }
    if(weightS) {
      setWeight(weightS);
    } else {
      setAge(0);
    }
    if(heightS) {
      setHeight(heightS);
    } else {
      setHeight("");
    }
    if(genderS) {
      setGender(genderS);
    } else {
      setGender("")
    }
    if(activityS) {
      setActivityLevel(activityS);
    } else {
      setActivityLevel("");
    }
    if(targetGoalS) {
      setGoal(targetGoalS);
    } else {
      setGoal("");
    }
    if(medicationS) {
      setMedications(medicationS);
    } else {
      setMedications("");
    }
  };
  useEffect(() => {
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
  const handleConfigurationForms = (event: SyntheticEvent, state: (value: React.SetStateAction<string>) => void): void => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    state(target.value);
  };

  const gpt = async () => {
    console.log('hi');
    const config: GptQuery = {
      breakfast_foods: breakfast.join(''),
      lunch_foods: lunch.join(''),
      dinner_foods: dinner.join(''),
      snacks: snacks.join(''),
      allergies,
      age,
      weight,
      height,
      gender,
      activity_level: activityLevel,
      target_nutrition_goal: goal,
      medications
    };
    console.log(config);
    const results = await gptQueryJson(config);
    console.log(results);
    const nutrientsSuggestions: string[] = [];
    const foodsToAdd: string[] = [];
    const foodsToRemove: string[] = [];
    results.foods_to_add.map((food: FoodToAdd) => {
      foodsToAdd.push(food.name);
    })
    results.missing_vitamins.map((nutrient: MissingVitamin) => {
      nutrientsSuggestions.push(nutrient.name);
    })
    results.foods_to_remove.map((food: FoodToRemove) => {
      foodsToRemove.push(food.name);
    })
    setFoodToAdd(foodsToAdd);
    setFoodToRemove(foodsToRemove);
    setMissingVitamins(nutrientsSuggestions);
  }
  const save = async () => {
    await createConfiguraiton(allergies, age, weight, height, gender, activityLevel, goal, medications);
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const openDrawer = async () => {
    console.log('hi');
    await fetchData();
    onOpen();
  }
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
        <Button boxShadow='md' colorScheme='blue' mt='3' w='86%' onClick={gpt}>Get Feedback for Today</Button>
        </Box>
        <Box>
          <Heading size='md' mt = '3'>Suggested Nutrients</Heading>
          <Flex mt = '2' w='290px' h='200px' border="3px inset"borderRadius='7px' justifyContent='center'>
            <UnorderedList>
              {
                missingVitamins.map(vitamin => {
                  return(
                    <ListItem>{vitamin}</ListItem>
                  );
                })
              }
              </UnorderedList>
          </Flex>
          <Heading size='md' mt='3'>Suggested Foods</Heading>
          <Flex mt = '2' w='290px' h='200px' border="3px inset"borderRadius='7px' justifyContent='center'>
             <UnorderedList>
              {
                foodToAdd.map(food => {
                  return(
                    <ListItem>{food}</ListItem>
                  );
                })
              }
              </UnorderedList>
          </Flex>

          <Heading size='md' mt = '3'>Foods to Avoid</Heading>
          <Flex mt = '2' w='290px' h='200px' border="3px inset"borderRadius='7px' justifyContent='center'>
            <UnorderedList>
              {
                foodToRemove.map(food => {
                  return(
                    <ListItem>{food}</ListItem>
                  );
                })
              }
              </UnorderedList>
          </Flex>
          <Button ref={btnRef} onClick={openDrawer}boxShadow='md' colorScheme='orange' mt='3' w='100%'>Configure Your Results</Button>
            <Drawer
              isOpen={isOpen}
              placement='right'
              onClose={onClose}
              finalFocusRef={btnRef}
            >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Configure Your Results</DrawerHeader>

              <DrawerBody>
                <form>
                  <FormControl>
                    <FormLabel>Allergies</FormLabel>
                    <Input onChange={(event) => {handleConfigurationForms(event, setAllergies)}} defaultValue={allergies}></Input>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Age</FormLabel>
                    <Input onChange={(event) => {handleConfigurationForms(event, setAge)}} defaultValue={age}></Input>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Weight</FormLabel>
                    <Input onChange={(event) => {handleConfigurationForms(event, setWeight)}} defaultValue={weight}></Input>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Height</FormLabel>
                    <Input onChange={(event) => {handleConfigurationForms(event, setHeight)}} defaultValue ={height}></Input>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Activity Level</FormLabel>
                    <Input onChange={(event) => {handleConfigurationForms(event, setActivityLevel)}} defaultValue={activityLevel}></Input>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Goals with Nutrition</FormLabel>
                    <Input onChange={(event) => {handleConfigurationForms(event, setGoal)}} defaultValue={goal}></Input>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Current Medications</FormLabel>
                    <Input onChange={(event) => {handleConfigurationForms(event, setMedications)}} defaultValue ={medications}></Input>
                  </FormControl>
                </form>

              </DrawerBody>

              <DrawerFooter>
                <Button variant='outline' mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button onClick = {save} colorScheme='blue'>Save</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Box>
      </Flex>
    </>
  )
}

export default Dashboard;