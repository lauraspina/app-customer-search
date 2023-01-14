import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Divider,
  Text,
  Flex,
} from "@chakra-ui/react";
import React from "react";

export const InfoCard = ({ name, phone, email, surface, budget, rooms }) => {
  return (
    <Card bg="rgb(253, 234, 234)" p="1.5rem">
      <CardBody p="0">
        <Stack spacing="1">
          <Heading color="rgb(236, 94, 42)" size="md">
            {name}
          </Heading>
          <Text>{phone}</Text>
          <Text color="blue.600" fontSize="l">
            {email}
          </Text>
        </Stack>
      </CardBody>
      <Flex direction="column">
        <Text display="block">Surface: {surface}</Text>
        <Text display="block">Budget: €{budget}</Text>
        <Text display="block">Rooms: {rooms}</Text>
      </Flex>
    </Card>
  );
};
