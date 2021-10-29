import { NextPage } from "next";
import { Text, Flex } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";

const Grupo: NextPage = () => {
  const router = useRouter();
  const { group_id } = router.query;

  console.log({ group_id });
  return (
    <Flex w="50vw" h="50vh" align="center" justify="center" flexDir="column">
      <Text fontFamily="Pacifico" size="64">
        Ahá! {group_id}
      </Text>
    </Flex>
  );
};

export default Grupo;
