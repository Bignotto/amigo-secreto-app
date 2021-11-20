import { Text, Flex, Button, Link, Box, Icon } from "@chakra-ui/react";
import { FiGift, FiTag, FiCalendar, FiClock, FiMapPin } from "react-icons/fi";

interface GroupProps {
  name: string;
  value?: string;
  date?: string;
  time?: string;
  place?: string;
}

export function Group({ name, value, date, time, place }: GroupProps) {
  return (
    <Flex
      mb="3"
      p="10"
      borderRadius="8"
      bg="blue.400"
      flexDir="column"
      color="black"
    >
      <Flex flexDir="row" align="center">
        <Icon as={FiGift} boxSize="6" />
        <Text fontSize="22px" mt="1" ml="3" isTruncated>
          {name}
        </Text>
      </Flex>
      {value && (
        <Flex flexDir="row" align="center" mt="3">
          <Text fontSize="22px">R$</Text>
          <Text fontSize="22px" mt="1" ml="3">
            {value}
          </Text>
        </Flex>
      )}
      {date && (
        <Flex flexDir="row" align="center" mt="3">
          <Icon as={FiCalendar} boxSize="6" />
          <Text fontSize="22px" mt="1" ml="3">
            {date}
          </Text>
        </Flex>
      )}
      {time && (
        <Flex flexDir="row" align="center" mt="3">
          <Icon as={FiClock} boxSize="6" />
          <Text fontSize="22px" mt="1" ml="3">
            {time}
          </Text>
        </Flex>
      )}
      {place && (
        <Flex flexDir="row" align="center" mt="3">
          <Icon as={FiMapPin} boxSize="6" />
          <Text fontSize="22px" mt="1" ml="3">
            {place}
          </Text>
        </Flex>
      )}
    </Flex>
  );
}
