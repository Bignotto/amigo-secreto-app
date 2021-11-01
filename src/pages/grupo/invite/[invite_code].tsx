import { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Text, Flex } from "@chakra-ui/react";

import { useRoom } from "../../../hooks/useGroup";

const Invite: NextPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { invite_code } = router.query;

  const code = invite_code ? invite_code.toString().toUpperCase() : "AAAAAA";

  const { group } = useRoom(code);

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

export default Invite;
