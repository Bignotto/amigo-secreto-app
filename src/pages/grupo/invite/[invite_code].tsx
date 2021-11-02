import { FormEvent, useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Text, Flex, Input, Button } from "@chakra-ui/react";
import crypto from "crypto";

import { database } from "../../../services/firebase";
import { ref, set, get, child } from "firebase/database";

import { useRoom } from "../../../hooks/useGroup";
import { Friend } from "../../../hooks/IFriend";
import { GroupAmigoSecreto } from "../../../hooks/IGroup";

const Invite: NextPage = () => {
  const router = useRouter();
  const { invite_code } = router.query;

  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const code = invite_code ? invite_code.toString().toUpperCase() : "AAAAAA";

  const { group, friends } = useRoom(code);

  useEffect(() => {
    setIsLoading(router.isReady);
  }, [router.isReady]);

  const handleJoinWithPassword = async (event: FormEvent) => {
    event.preventDefault();

    if (password === group.password) {
      const id = crypto.randomBytes(3).toString("hex").toUpperCase();
      localStorage.setItem("ams_app_user", id);

      const friend: Friend = {
        id,
        name: name,
      };

      const newFriends: Friend[] = [...friends, friend];
      try {
        await set(ref(database, `groups/${code}`), {
          ...group,
          friends: newFriends,
        });
        router.push(`/grupo/${code}`);
      } catch (e) {
        console.error("Error adding document: ", e);
      }

      alert("senha correta!");
    }
  };

  return (
    <Flex align="center" justify="center">
      <Flex w={["95vw", "50vw"]} flexDir="column">
        <Text fontFamily="Roboto" fontSize="2xl">
          Amigo Secreto {group.name}
        </Text>
        <Flex
          width="100%"
          as="form"
          flexDir="column"
          onSubmit={handleJoinWithPassword}
        >
          <Text mt="5" fontFamily="Roboto">
            Como você se chama?
          </Text>
          <Input
            placeholder="Seu nome"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Text mt="5" fontFamily="Roboto">
            Qual é a senha do grupo?
          </Text>
          <Input
            placeholder="Senha"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <Button type="submit" bg="blue.600" mt="20">
            Entrar no grupo
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Invite;