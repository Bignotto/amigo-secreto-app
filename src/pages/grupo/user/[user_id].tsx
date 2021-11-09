import { FormEvent, useEffect, useState } from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

import { Text, Flex, Input, Button } from "@chakra-ui/react";
import { Header } from "../../../components/Header";

import { ref, set, get, child } from "@firebase/database";
import { database } from "../../../services/firebase";
import { Friend } from "../../../hooks/IFriend";

export default function UserInfo() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [shoeSize, setShoeSize] = useState("");
  const [size, setSize] = useState("");
  const [like, setLike] = useState("");
  const [dontLike, setDontLike] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("ams_app_user");

    if (!userId) {
      alert("Invalid Session: not userId");
      router.push("/");
    }
    setUser(userId || "");

    async function fetchUserData() {
      const userRef = ref(database);
      const userDataDatabase = await get(child(userRef, `users/${userId}`));

      const loadedUser: Friend = userDataDatabase.val();
      if (!loadedUser) {
        alert("Invalid User: user id not found");
        router.push("/");
      }
      setName(loadedUser.name);
      setShoeSize(loadedUser.shoeSize ?? "");
      setSize(loadedUser.size ?? "");
      setLike(loadedUser.like ?? "");
      setDontLike(loadedUser.dontLike ?? "");
    }
    fetchUserData();
  }, [router]);

  const handleSaveUserInfo = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await set(ref(database, `users/${user}`), {
        id: user,
        name,
        size,
        shoeSize,
        like,
        dontLike,
      } as Friend);
      router.back();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <Flex align="center" justify="center" flexDir="column">
      <Header />
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
          onSubmit={handleSaveUserInfo}
        >
          <Text>{name}, conte mais sobre você.</Text>
          <Text mt="15" fontFamily="Roboto">
            Que número você calça?
          </Text>
          <Input
            placeholder="Número"
            value={shoeSize}
            onChange={(event) => setShoeSize(event.target.value)}
          />
          <Text mt="15" fontFamily="Roboto">
            Que tamanho você usa?
          </Text>
          <Input
            placeholder="P, M, G ou GG"
            value={size}
            onChange={(event) => setSize(event.target.value)}
          />
          <Text fontSize="small" mt="15">
            Fale sobre o que você gosta ou não gosta, assim seu amigo secreto
            vai saber o que seria um bom presente pra você. Pode ser uma cor ou
            um livro que você queira ganhar, um hobby ou do que gosta de fazer.
          </Text>
          <Text mt="15" fontFamily="Roboto">
            Coisas que você gosta
          </Text>
          <Input
            placeholder="Azul, livros de ficção e chocolate"
            value={like}
            onChange={(event) => setLike(event.target.value)}
          />
          <Text mt="15" fontFamily="Roboto">
            Coisas que você não gosta
          </Text>
          <Input
            placeholder="Verde, ganhar roupas e sertanejo"
            value={dontLike}
            onChange={(event) => setDontLike(event.target.value)}
          />
          <Button type="submit" bg="blue.600" mt="2">
            Salvar informações
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
