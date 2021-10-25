import { SetStateAction, useState } from "react";
import crypto from "crypto";

import type { NextPage } from "next";
import { Flex, Stack, Button, Input, Text } from "@chakra-ui/react";

import { db, database } from "../services/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  onSnapshot,
  doc,
} from "firebase/firestore";

import { ref, set } from "firebase/database";

interface IUsers {
  first: string;
  last: string;
  born: number;
}

const Home: NextPage = () => {
  const [value, setValue] = useState("");
  const [invite, setInvite] = useState("");

  const q = query(collection(db, "users"));

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setValue(event.target.value);
  };

  const handleChangeInvite = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setInvite(event.target.value);
  };

  const handleClick = async () => {
    const id = crypto.randomBytes(6).toString("hex");
    try {
      await set(ref(database, `groups/${id}`), {
        group_name: "teste grupo",
        group_owner: "thiago bignotto",
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleClickInvite = async () => {
    const id = crypto.randomBytes(6).toString("hex");
    try {
      await set(ref(database, `invite/${id}`), {
        from_group_name: "família",
        invite_code: "xpto5267",
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center" flexDir="column">
      <Stack spacing="4">
        <Input
          name="group"
          type="text"
          label="Novo grupo"
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
      <Stack spacing="4">
        <Input
          name="invite"
          type="text"
          label="Tenho um convite"
          value={invite}
          onChange={handleChangeInvite}
        />
      </Stack>
      <Button
        type="submit"
        mt="6"
        colorScheme="pink"
        onClick={(e) => handleClickInvite()}
      >
        Entrar
      </Button>
    </Flex>
  );
};

export default Home;
