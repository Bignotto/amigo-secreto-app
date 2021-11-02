import { useEffect, useState } from "react";
import { NextPage } from "next";
import { Text, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRoom } from "../../hooks/useGroup";
import { Friend } from "../../hooks/IFriend";

//PÁGINA DO GRUPO
const Group: NextPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState("");
  const { group_id } = router.query;

  const id = group_id ? group_id.toString().toUpperCase() : "AAAAAA";

  const { group, friends } = useRoom(id);

  useEffect(() => {
    const data = localStorage.getItem("ams_app_user");
    if (!data) {
      alert("Invalid Session");
      router.push("/");
    }
    setUser(data || "");
    setIsLoading(router.isReady);
  }, [router]);

  return (
    <Flex align="center" justify="center">
      <Flex w={["95vw", "50vw"]} flexDir="column">
        <Text fontFamily="Pacifico" fontSize="2xl">
          Amigo Secreto {group.name}
        </Text>
        {!isLoading && <Text>Carregando</Text>}
        {isLoading && (
          <Text>
            A revelação está marcada para {group.date}, em {group.where}. O
            valor médio dos presentes é de {group.value}
          </Text>
        )}
        <Text>owner id: {group.ownerId}</Text>
        <Text>user: {user}</Text>
        <Flex bg="yellow.900" flexDir="column">
          {friends.map((friend) => {
            const isAdmin = friend.id === group.ownerId;
            return (
              <Flex key={friend.id}>
                {isAdmin && <Text>* </Text>}
                <Text>{friend.name}</Text>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Group;
