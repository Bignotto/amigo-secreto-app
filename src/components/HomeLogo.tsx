import { NextPage } from "next";
import { Center, Text } from "@chakra-ui/react";

const HomeLogo: NextPage = () => {
  return (
    <Center flexDir="column" mb="6">
      <Text fontFamily="Pacifico" fontSize="80px">
        Amigo
      </Text>
      <br />
      <Text fontFamily="Pacifico" fontSize="80px" mt="-61">
        Secreto
      </Text>
    </Center>
  );
};

export default HomeLogo;
