import { useEffect, useState } from "react";
import { NextPage } from "next";
import { Text, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRoom } from "../../hooks/useGroup";
import { GroupAmigoSecreto } from "../../hooks/IGroup";

//PÁGINA DO GRUPO
const Group: NextPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { group_id } = router.query;

  const id = group_id ? group_id.toString().toUpperCase() : "AAAAAA";

  const { group } = useRoom(id);

  useEffect(() => {
    setIsLoading(router.isReady);
  }, [router.isReady]);

  return (
    <Flex align="center" justify="center">
      <Flex w="50vw" h="50vh" align="center" justify="center" flexDir="column">
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
      </Flex>
    </Flex>
  );
};

export default Group;
