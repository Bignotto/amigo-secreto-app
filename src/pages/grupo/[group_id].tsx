import { FormEvent, useEffect, useState } from "react";
import { NextPage } from "next";
import { Text, Flex, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRoom } from "../../hooks/useGroup";
import { ref, set } from "firebase/database";
import { Friend } from "../../hooks/IFriend";
import { database } from "../../services/firebase";
import { GroupAmigoSecreto } from "../../hooks/IGroup";

//PÁGINA DO GRUPO
const Group: NextPage = () => {
  const router = useRouter();

  const [user, setUser] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [drawnFriend, setDrawnFriend] = useState("");

  const { group_id } = router.query;
  const id = group_id ? group_id.toString().toUpperCase() : "AAAAAA";
  const { group, friends, result } = useRoom(id);

  useEffect(() => {
    const user = localStorage.getItem("ams_app_user");

    if (!user) {
      alert("Invalid Session");
      router.push("/");
    }

    if (router.isReady) {
      const found = friends.find((friend) => friend.id === user);
      if (!found) {
        alert("Invalid Session!");
        router.push("/");
      }

      const friendIndex = friends.findIndex((friend) => friend.id === user);
      if (result.length && friendIndex >= 0) {
        setDrawnFriend(result[friendIndex].name);
      }
    }

    setUser(user || "");
    setIsAdmin(user === group.ownerId);
  }, [router, friends, group, result]);

  const handleDrawGroup = async (event: FormEvent) => {
    let cont = 10;
    const result: Friend[] = friends.map((friend) => friend);

    while (cont !== 0) {
      cont = 0;
      let currentIndex = friends.length;
      let randomIndex: number;

      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [result[currentIndex], result[randomIndex]] = [
          result[randomIndex],
          result[currentIndex],
        ];
      }
      for (let i = 0; i < friends.length; i++) {
        console.log(friends[i].id === result[i].id);
        if (friends[i].id === result[i].id) cont++;
      }
      if (cont === 0) console.log({ friends, result, cont });
    }

    try {
      await set(ref(database, `groups/${group_id}`), {
        ...group,
        result,
      } as GroupAmigoSecreto);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <Flex align="center" justify="center">
      <Flex w={["95vw", "50vw"]} flexDir="column">
        <Text fontFamily="Pacifico" fontSize="2xl">
          Amigo Secreto {group.name}
        </Text>
        {!router.isReady ? (
          <Text>Carregando</Text>
        ) : (
          <>
            <Text>
              A revelação está marcada para {group.date}, em {group.where}. O
              valor médio dos presentes é de {group.value}
            </Text>
            <Text>owner id: {group.ownerId}</Text>
            <Text>user: {user}</Text>
            <Flex bg="yellow.900" flexDir="column">
              {friends.map((friend) => {
                const groupAdmin = friend.id === group.ownerId;
                return (
                  <Flex key={friend.id}>
                    {groupAdmin && <Text>* </Text>}
                    <Text>{friend.name}</Text>
                  </Flex>
                );
              })}
            </Flex>
            {isAdmin && (
              <Button
                width="100%"
                bg="blue.600"
                mt="2"
                onClick={handleDrawGroup}
              >
                SORTEAR GRUPO
              </Button>
            )}
            <Text>Seu amigo secreto é {drawnFriend}</Text>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Group;
