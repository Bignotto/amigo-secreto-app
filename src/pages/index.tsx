import { FormEvent, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import crypto from "crypto";

import { Flex, Button, Input, Text, Link } from "@chakra-ui/react";

import { database } from "../services/firebase";
import { ref, set, get, child } from "firebase/database";
import { GroupAmigoSecreto } from "../hooks/IGroup";
import HomeLogo from "../components/HomeLogo";

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
      const groupVal = await get(
        child(groupRef, `groups/${invite.toUpperCase()}`)
      );

      setLoadingInvite(false);

      const group: GroupAmigoSecreto = groupVal.val();
      if (group) {
        if (group?.result) {
          alert("Este groupo já foi sorteado.");
          router.push("/");
          return;
        }
        router.push(`/grupo/invite/${invite.toUpperCase()}`);
      } else alert("Grupo não encontrado!");
    } catch (e) {
      console.error("Error processing invitation: ", e);
    }
  };

  return (
    <Flex align="center" justify="center">
      <Flex
        w={["95vw", "25vw"]}
        align="center"
        justify="center"
        flexDir="column"
      >
        <Flex
          width="100%"
          as="form"
          flexDir="column"
          onSubmit={handleCreateNewGroup}
        >
          <HomeLogo />
          <Text>Faça o sorteio do seu grupo de Amigo Secreto!</Text>
          <br />
          <Text>
            Não precisa criar uma conta, confirmar e-mail nem decorar
            senha!&nbsp;
            <Link href="/instructions" color="blue.300">
              Veja como funciona.
            </Link>
          </Text>
          <Text mt="10" fontFamily="Roboto">
            Qual vai ser o nome do seu grupo?
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
            Para entrar com um convite insira o código que você recebeu abaixo:
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
