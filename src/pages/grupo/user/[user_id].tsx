import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Text, Flex, Input, Button } from "@chakra-ui/react";
import { Header } from "../../../components/Header";

import { ref, set, get, child } from "@firebase/database";
import { database } from "../../../services/firebase";
import { Friend } from "../../../hooks/IFriend";

export default function UserInfo() {
  const router = useRouter();
  const [localUser, setLocalUser] = useState("");
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
    setLocalUser(userId || "");

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
      await set(ref(database, `users/${localUser}`), {
        id: localUser,
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
    <Flex align="center" justify="center" flexDir="column" mb="56">
      <Header />
      <Flex
        w={["90vw", "25vw"]}
        align="center"
        justify="center"
        flexDir="column"
      >
        <Flex
          width="100%"
          as="form"
          flexDir="column"
          onSubmit={handleSaveUserInfo}
        >
          <Text>{name}, conte mais sobre voc??.</Text>
          <Text mt="15" fontFamily="Roboto">
            Que n??mero voc?? cal??a?
          </Text>
          <Input
            placeholder="N??mero"
            value={shoeSize}
            onChange={(event) => setShoeSize(event.target.value)}
          />
          <Text mt="15" fontFamily="Roboto">
            Que tamanho voc?? usa?
          </Text>
          <Input
            placeholder="P, M, G ou GG"
            value={size}
            onChange={(event) => setSize(event.target.value)}
          />
          <Text fontSize="small" mt="15">
            Fale sobre o que voc?? gosta ou n??o gosta, assim seu amigo secreto
            vai saber o que seria um bom presente pra voc??. Pode ser uma cor ou
            um livro que voc?? queira ganhar, um hobby ou do que gosta de fazer.
          </Text>
          <Text mt="15" fontFamily="Roboto">
            Coisas que voc?? gosta
          </Text>
          <Input
            placeholder="Azul, livros de fic????o e chocolate"
            value={like}
            onChange={(event) => setLike(event.target.value)}
          />
          <Text mt="15" fontFamily="Roboto">
            Coisas que voc?? n??o gosta
          </Text>
          <Input
            placeholder="Verde, ganhar roupas e sertanejo"
            value={dontLike}
            onChange={(event) => setDontLike(event.target.value)}
          />
          <Button type="submit" bg="blue.600" mt="2">
            Salvar informa????es
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
