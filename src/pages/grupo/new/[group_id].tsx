import { FormEvent, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Text, Flex, Input, Button } from "@chakra-ui/react";
import { database } from "../../../services/firebase";
import { ref, set } from "firebase/database";
import { useRoom } from "../../../hooks/useGroup";
import { GroupAmigoSecreto } from "../../../hooks/IGroup";

//PÁGINA CRIAÇÃO GRUPO
const NewGroup: NextPage = () => {
  const router = useRouter();
  const { group_id } = router.query;

  if (!group_id) throw new Error("Missing information: group id");

  const { group } = useRoom(group_id.toString());
  const [owner, setOwner] = useState("");
  const [date, setDate] = useState("");
  const [where, setWhere] = useState("");
  const [value, setValue] = useState("");

  const handleSaveGroupInfo = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await set(ref(database, `groups/${group_id}`), {
        owner,
        date,
        where,
        value,
      } as GroupAmigoSecreto);
      router.push(`/grupo/${group_id}`);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <Flex align="center" justify="center">
      <Flex w={["95vw", "50vw"]} flexDir="column">
        <Text fontFamily="Roboto">
          Ótimo! Vamos criaro o grupo {group.name}
        </Text>
        <Flex
          width="100%"
          as="form"
          flexDir="column"
          onSubmit={handleSaveGroupInfo}
        >
          <Text mt="5" fontFamily="Roboto">
            Como você se chama?
          </Text>
          <Input
            placeholder="Como seus amigos te conhecem?"
            value={owner}
            onChange={(event) => setOwner(event.target.value)}
          />
          <Text mt="5" fontFamily="Roboto">
            Quando vai ser a revelação?
          </Text>
          <Input
            type="datetime-local"
            placeholder="Quando"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
          <Text mt="5" fontFamily="Roboto">
            Onde vai ser a revelação?
          </Text>
          <Input
            placeholder="Onde?"
            value={where}
            onChange={(event) => setWhere(event.target.value)}
          />
          <Text mt="5" fontFamily="Roboto">
            Qual vai ser o valor médio dos presentes?
          </Text>
          <Input
            placeholder="Valor?"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          <Button type="submit" bg="blue.600" mt="15">
            Criar Grupo
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NewGroup;
