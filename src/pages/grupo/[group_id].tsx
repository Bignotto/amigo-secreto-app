import { NextPage } from "next";
import { Text, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRoom } from "../../hooks/useGroup";

//PÁGINA DO GRUPO
const Group: NextPage = () => {
  const router = useRouter();
  const { group_id } = router.query;

  if (!group_id) throw new Error("Missing information: group id");

  const { name } = useRoom(group_id.toString());

  return (
    <Flex align="center" justify="center">
      <Flex w="50vw" h="50vh" align="center" justify="center" flexDir="column">
        <Text fontFamily="Pacifico" size="64">
          Novo grupo de amigo secreto {name}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Group;
