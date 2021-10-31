import { NextPage } from "next";
import { Text, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRoom } from "../../hooks/useGroup";

//PÁGINA DO GRUPO
const Group: NextPage = () => {
  const router = useRouter();
  const { group_id } = router.query;

  if (!group_id) throw new Error("Missing information: group id");

  const { group } = useRoom(group_id.toString());

  return (
    <Flex align="center" justify="center">
      <Flex w="50vw" h="50vh" align="center" justify="center" flexDir="column">
        <Text fontFamily="Pacifico" fontSize="2xl">
          Amigo Secreto {group.name}
        </Text>
        <Text>
          A revelação está marcada para {group.date}, em {group.where}. O valor
          médio dos presentes é de {group.value}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Group;
