import { useState } from "react";
import { NextPage } from "next";
import { Text, Flex, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRoom } from "../../../hooks/useGroup";

//PÁGINA CRIAÇÃO GRUPO
const NewGroup: NextPage = () => {
  const router = useRouter();
  const { group_id } = router.query;

  if (!group_id) throw new Error("Missing information: group id");

  const { name } = useRoom(group_id.toString());
  const [owner, setOwner] = useState("");

  return (
    <Flex align="center" justify="center">
      <Flex w={["95vw", "50vw"]} flexDir="column">
        <Text fontFamily="Roboto">Ótimo! Vamos criaro o grupo {name}</Text>
        <Flex width="100%" as="form" flexDir="column">
          <Text mt="10" fontFamily="Roboto">
            Como você se chama?
          </Text>
          <Input
            placeholder="Como seus amigos te conhecem?"
            value={owner}
            onChange={(event) => setOwner(event.target.value)}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NewGroup;
