import { SetStateAction, useState } from "react";
import crypto from "crypto";

import type { NextPage } from "next";
import { Flex, Stack, Button, Input, Text, Image } from "@chakra-ui/react";

import { database } from "../services/firebase";

import { ref, set } from "firebase/database";

const Home: NextPage = () => {
  const [groupName, setGroupName] = useState("");
  const [invite, setInvite] = useState("");

  const changeGroupName = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setGroupName(event.target.value);
    console.log({ groupName });
  };

  const handleChangeInvite = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setInvite(event.target.value);
  };

  const handleCreateNewGroup = async (event) => {
    event.preventDefault();
    const id = crypto.randomBytes(3).toString("hex").toUpperCase();

    try {
      await set(ref(database, `groups/${id}`), {
        group_name: groupName,
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
      <Flex
        w={["90vw", "50vw"]}
        h="100vh"
        align="center"
        justify="center"
        flexDir="column"
      >
        <Text fontFamily="Pacifico" fontSize="6xl">
          Amigo
          <br />
          Secreto
        </Text>
        <Flex as="form" flexDir="column" onSubmit={handleCreateNewGroup}>
          <Text mt="10" fontFamily="Roboto">
            Crie seu grupo de Amigo Secreto:
          </Text>
          <Input
            placeholder="Nome do grupo"
            value={groupName}
            onChange={changeGroupName}
          />
          <Button type="submit">Criar Grupo</Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;
