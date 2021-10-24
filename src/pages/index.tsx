import { SetStateAction, useState } from "react";
import type { NextPage } from "next";
import { Flex, Stack, Button, Input } from "@chakra-ui/react";

import { db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";

const Home: NextPage = () => {
  const [value, setValue] = useState("");

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setValue(event.target.value);
    console.log(event.target.value);
  };

  const handleClick = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Stack spacing="4">
        <Input
          name="email"
          type="email"
          label="E-Mail"
          value={value}
          onChange={handleChange}
        />
      </Stack>
      <Button
        type="submit"
        mt="6"
        colorScheme="pink"
        onClick={(e) => handleClick()}
      >
        Entrar
      </Button>
    </Flex>
  );
};

export default Home;
