import { SetStateAction, useState } from "react";
import crypto from "crypto";

import type { NextPage } from "next";
import { Flex, Stack, Button, Input, Text, Image } from "@chakra-ui/react";

import { database } from "../services/firebase";

import { ref, set } from "firebase/database";

const Home: NextPage = () => {
  const [value, setValue] = useState("");
  const [invite, setInvite] = useState("");

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
    <Flex align="center" justify="center">
      <Flex w="50vw" h="100vh" align="center" justify="center" flexDir="column">
        <Text fontFamily="Pacifico" fontSize="6xl">
          Amigo
          <br />
          Secreto
        </Text>
        <Text fontFamily="Roboto">Crie seu grupo de Amigo Secreto:</Text>
        <Input placeholder="Nome do grupo" />
      </Flex>
    </Flex>
  );
};

export default Home;
