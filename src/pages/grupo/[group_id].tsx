import { FormEvent, useEffect, useState } from "react";
import { NextPage } from "next";
import { Text, Flex, Button, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useGroup } from "../../hooks/useGroup";
import { ref, set } from "firebase/database";
import { Friend } from "../../hooks/IFriend";
import { database } from "../../services/firebase";
import { Header } from "../../components/Header";
import { Invite } from "../../components/Invite";
import { Group as GroupInfo } from "../../components/Group";
import { FriendsList } from "../../components/FriendsList";
import { GroupAmigoSecreto } from "../../hooks/IGroup";
import { FriendInfo } from "../../components/Friend";

//PÁGINA DO GRUPO
const Group: NextPage = () => {
  const router = useRouter();

  const [localUser, setLocalUser] = useState("");
  const [userName, setUserName] = useState("");

  const [isAdmin, setIsAdmin] = useState(false);
  const [isDrawn, setIsDrawn] = useState(false);
  const [drawnFriend, setDrawnFriend] = useState("");

  const [showFriend, setShowFriend] = useState(false);

  const { group_id } = router.query;
  const id = group_id ? group_id.toString().toUpperCase() : "AAAAAA";
  const { group, friends, result } = useGroup(id);

  useEffect(() => {
    const user = localStorage.getItem("ams_app_user");

    if (!user) {
      alert("Invalid Session not user");
      router.push("/");
    }

    if (router.isReady) {
      if (Object.keys(group).length === 1) {
        alert(group.name);
        router.push("/");
      }
    }

    const found = friends.find((friend) => friend.id === user);
    if (!found && friends.length > 0) {
      alert("Invalid Session! not friend");
      router.push("/");
    }
    setUserName(found?.name ?? "");

    if (result.length > 0) setIsDrawn(true);

    const friendIndex = friends.findIndex((friend) => friend.id === user);
    if (result.length && friendIndex >= 0) {
      setDrawnFriend(result[friendIndex].id);
    }

    setLocalUser(user || "");
    setIsAdmin(user === group.ownerId);
  }, [router, friends, group, result, isDrawn]);

  const handleDrawGroup = async (event: FormEvent) => {
    event.preventDefault();

    if (friends.length <= 2) {
      alert("Você precisa de pelo menos três amigos para sortear o grupo.");
      return;
    }

    if (!confirm("Sortear o grupo?")) return;

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
        if (friends[i].id === result[i].id) cont++;
      }
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
    <Flex align="center" justify="center" flexDir="column" mb="56">
      <Header />

      <Flex w={["95vw", "25vw"]} flexDir="column">
        {!isDrawn && <Invite code={id} pass={group.password ?? ""} />}
        {!router.isReady ? (
          <Text>Carregando</Text>
        ) : (
          <>
            <GroupInfo
              name={group.name}
              value={group.value}
              date={group.date}
              time="10hs"
              place={group.where}
            />
            {isDrawn && (
              <Flex flexDir="column" mb="3">
                <Text>O sorteio foi realizado!</Text>
                <Button bg="red.600" onClick={() => setShowFriend(!showFriend)}>
                  Ver meu Amigo Secreto!
                </Button>
                {showFriend && (
                  <>
                    <FriendInfo friendId={drawnFriend} />
                    <Text>
                      Tire um printe dessa tela. O AmigoSecretoApp não guarda as
                      informações por muito tempo e não será possível recuperar
                      o resultado do sorteio depois de fechar o aplicativo.
                    </Text>
                  </>
                )}
              </Flex>
            )}

            <Button
              bg="orange.300"
              color="gray.800"
              onClick={() => router.push(`/grupo/user/${localUser}`)}
            >
              {userName.trim()}, conte mais sobre você!
            </Button>

            {isAdmin && !isDrawn && (
              <Button
                width="100%"
                bg="red.600"
                mt="3"
                onClick={handleDrawGroup}
              >
                SORTEAR GRUPO
              </Button>
            )}

            {friends.length && (
              <FriendsList
                friends={friends}
                groupId={id}
                isAdmin={isAdmin}
                isDrawn={isDrawn}
              />
            )}
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Group;
