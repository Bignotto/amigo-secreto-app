import { Text, Flex, Input, Button } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

const UserInfo: NextPage = () => {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [shoeSize, setShoeSize] = useState("");
  const [size, setSize] = useState("");
  const [like, setLike] = useState("");
  const [dontLike, setDontLike] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("ams_app_user");

    if (!user) {
      alert("Invalid Session: not user");
      router.push("/");
    }

    setUser(user || "");
  }, [router]);

  //const handleSaveUserInfo = async (event: FormEvent) =>

  return (
    <Flex align="center" justify="center">
      <Flex
        w={["90vw", "50vw"]}
        align="center"
        justify="center"
        flexDir="column"
      >
        <Text fontFamily="Pacifico" fontSize="6xl">
          Amigo
          <br />
          Secreto
        </Text>
        <Flex
          width="100%"
          as="form"
          flexDir="column"
          //onSubmit={handleCreateNewGroup}
        >
          <Text>{user}, conte mais sobre você.</Text>
          <Text mt="10" fontFamily="Roboto">
            Que número você calça?
          </Text>
          <Input
            placeholder="Número"
            value={shoeSize}
            onChange={(event) => setShoeSize(event.target.value)}
          />
          <Button type="submit" bg="blue.600" mt="2">
            Salvar informações
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default UserInfo;
