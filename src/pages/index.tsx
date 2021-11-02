import { FormEvent, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import crypto from "crypto";

import { Flex, Button, Input, Text } from "@chakra-ui/react";

import { database } from "../services/firebase";
import { ref, set, get, child } from "firebase/database";

const Home: NextPage = () => {
  const router = useRouter();

  const [groupName, setGroupName] = useState("");
  const [invite, setInvite] = useState("");
  const [loadingInvite, setLoadingInvite] = useState(false);

  const handleCreateNewGroup = async (event: FormEvent) => {
    event.preventDefault();
    const id = crypto.randomBytes(3).toString("hex").toUpperCase();

    localStorage.setItem("ams_app_user", id);

    try {
      await set(ref(database, `groups/${id}`), {
        name: groupName,
        ownerId: id,
      });
      router.push(`/grupo/new/${id}`);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleInvite = async (event: FormEvent) => {
    event.preventDefault();
    setLoadingInvite(true);

    const id = crypto.randomBytes(3).toString("hex").toUpperCase();
    localStorage.setItem("ams_app_user", id);

    try {
      const groupRef = ref(database);
      const group = await get(
        child(groupRef, `groups/${invite.toUpperCase()}`)
      );

      setLoadingInvite(false);

      if (group.val()) router.push(`/grupo/invite/${invite.toUpperCase()}`);
      else alert("Grupo não encontrado!");
    } catch (e) {
      console.error("Error processing invitation: ", e);
    }
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
        <Flex
          width="100%"
          as="form"
          flexDir="column"
          onSubmit={handleCreateNewGroup}
        >
          <Text mt="10" fontFamily="Roboto">
            Crie seu grupo de Amigo Secreto:
          </Text>
          <Input
            placeholder="Nome do grupo"
            value={groupName}
            onChange={(event) => setGroupName(event.target.value)}
          />
          <Button type="submit" bg="blue.600" mt="2">
            Criar Grupo
          </Button>
        </Flex>
        <Flex width="100%" as="form" flexDir="column" onSubmit={handleInvite}>
          <Text mt="20" fontFamily="Roboto">
            Tenho um convite!
          </Text>
          <Input
            width="100%"
            placeholder="Código do convite"
            value={invite}
            onChange={(event) => setInvite(event.target.value)}
          />
          <Button
            width="100%"
            type="submit"
            bg="blue.600"
            mt="2"
            isLoading={loadingInvite}
          >
            Entrar no grupo
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;
