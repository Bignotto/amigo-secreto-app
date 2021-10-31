import { FormEvent, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import crypto from "crypto";

import { Flex, Stack, Button, Input, Text, Image } from "@chakra-ui/react";

import { database } from "../services/firebase";
import { ref, set } from "firebase/database";

const Home: NextPage = () => {
  const [groupName, setGroupName] = useState("");
  const [invite, setInvite] = useState("");

  const router = useRouter();

  const handleCreateNewGroup = async (event: FormEvent) => {
    event.preventDefault();
    const id = crypto.randomBytes(3).toString("hex").toUpperCase();

    try {
      await set(ref(database, `groups/${id}`), {
        name: groupName,
      });
      router.push(`/grupo/${id}`);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleInvite = async (event: FormEvent) => {
    event.preventDefault();
    // const id = crypto.randomBytes(3).toString("hex").toUpperCase();

    // try {
    //   await set(ref(database, `groups/${id}`), {
    //     group_name: groupName,
    //     group_owner: "thiago bignotto",
    //   });
    // } catch (e) {
    //   console.error("Error adding document: ", e);
    // }
  };

  return (
    <Flex align="center" justify="center">
      <Flex
        w={["90vw", "50vw"]}
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
            onChange={(event) => setGroupName(event.target.value)}
          />
          <Button type="submit">Criar Grupo</Button>
        </Flex>
        <Flex as="form" flexDir="column" onSubmit={handleCreateNewGroup}>
          <Text mt="20" fontFamily="Roboto">
            Tenho um convite!
          </Text>
          <Input
            placeholder="Código do convite"
            value={invite}
            onChange={(event) => setInvite(event.target.value)}
          />
          <Button type="submit">Entrar no grupo</Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;
