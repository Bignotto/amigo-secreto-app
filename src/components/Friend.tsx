import { Text, Flex, Button, Link, Box, Icon, Center } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Friend } from "../hooks/IFriend";
import { ref, set, get, child } from "@firebase/database";
import { database } from "../services/firebase";

interface FriendProps {
  friendId: string;
}

export function FriendInfo({ friendId }: FriendProps) {
  const [name, setName] = useState("");
  const [shoeSize, setShoeSize] = useState("");
  const [size, setSize] = useState("");
  const [like, setLike] = useState("");
  const [dontLike, setDontLike] = useState("");

  useEffect(() => {
    async function fetchUserData() {
      const userRef = ref(database);
      const userDataDatabase = await get(child(userRef, `users/${friendId}`));

      const loadedUser: Friend = userDataDatabase.val();
      if (!loadedUser) {
        alert("Invalid User: user id not found");
      }
      setName(loadedUser.name);
      setShoeSize(loadedUser.shoeSize ?? "");
      setSize(loadedUser.size ?? "");
      setLike(loadedUser.like ?? "");
      setDontLike(loadedUser.dontLike ?? "");
    }
    fetchUserData();
  }, [friendId]);

  return (
    <Flex
      w={["95vw", "50vw"]}
      mt="3"
      mb="3"
      p="5"
      borderRadius="8"
      bg="orange.300"
      flexDir="column"
      color="black"
    >
      <Center flexDir="column">
        <Text fontSize="18px">Seu Amigo Secreto é</Text>
        <Text fontWeight="bold" fontSize="5xl" mt="-3">
          {name.toUpperCase()}
        </Text>
      </Center>
      <Flex flexDir="row" justify="space-between">
        <Center flexDir="column">
          <Text fontWeight="bold">Eu calço:</Text>
          <Text
            fontFamily="Roboto Mono"
            fontWeight="bold"
            fontSize="4xl"
            mt="-3"
          >
            {shoeSize}
          </Text>
        </Center>
        <Center flexDir="column">
          <Text fontWeight="bold">Eu uso:</Text>
          <Text fontWeight="bold" fontSize="4xl" mt="-3">
            {size}
          </Text>
        </Center>
      </Flex>
      <Flex mt="2" mb="3">
        <Text fontWeight="bold" fontSize="18px">
          Eu gosto:&nbsp;
        </Text>
        <Text fontSize="18px">{like}</Text>
      </Flex>
      <Flex>
        <Text fontWeight="bold" fontSize="18px">
          Eu não gosto:&nbsp;
        </Text>
        <Text fontSize="18px">{dontLike}</Text>
      </Flex>
    </Flex>
  );
}
