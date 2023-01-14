import React, { useState } from "react";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Input,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Select,
  Text,
} from "@chakra-ui/react";
import { customers } from "../server/data";
import { InfoCard } from "./InfoCard";

export const Search = () => {
  // format data to have name and last name in the same string
  const formattedArr = customers.map((person) => {
    const name = `${person.firstName} ${person.lastName}`;
    return { ...person, name };
  });

  const [people, setPeople] = useState(formattedArr);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBudget, setFilterBudget] = useState("");
  const [filterRooms, setFilterRooms] = useState("");
  const [filterSurface, setFilterSurface] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterRoomsChange = (event) => {
    setFilterRooms(event.target.value);
  };

  const handleFilterSurfaceChange = (event) => {
    setFilterSurface(event.target.value);
  };

  console.log(filterBudget);

  const filteredPeople = people
    .filter((person) =>
      person.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((person) => {
      if (!filterBudget) return true;
      return person.search.budget <= filterBudget;
    })
    .filter((person) => {
      if (!filterRooms) return true;
      return person.search.rooms >= filterRooms;
    })
    .filter((person) => {
      if (!filterSurface) return true;
      return person.search.surface >= filterSurface;
    });

  return (
    <Flex justifyContent="center" flexDirection="column">
      <Heading
        px={{ base: 5, md: 10 }}
        py={{ base: 10, md: 15 }}
        mb={{ base: 5, md: 10 }}
        bg=" rgb(0, 56, 36)"
        color=" rgb(255, 205, 194)"
      >
        Customers Search
      </Heading>
      <Box px={{ base: 5, md: 10 }}>
        <Flex
          flexDirection={{ base: "column", sm: "row" }}
          flexWrap="wrap"
          gap={{ base: 5, md: 10 }}
          justify="space-between"
        >
          <Input
            maxW={{ base: "100%", md: "30%" }}
            type="text"
            placeholder="Type something ..."
            value={searchTerm}
            onChange={handleSearchChange}
          />

          <Flex
            gap={{ base: 5, md: 10 }}
            justify="space-between"
            w={{ base: "100%", md: "65%" }}
            direction={{ base: "column", md: "row" }}
          >
            <Flex
              direction={{ base: "column" }}
              maxW={{ base: "100%", md: "40%" }}
              w="100%"
              gap="3"
              justify="center"
            >
              <Slider
                onChangeEnd={(val) => setFilterBudget(val)}
                defaultValue={500000}
                min={0}
                max={1000000}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb index={0} />
                <SliderThumb index={1} />
              </Slider>

              <Text textAlign="center">
                {filterBudget ? `€${filterBudget}` : "500000"}
              </Text>
            </Flex>
            <Select
              maxW={{ base: "100%", md: "25%" }}
              id="rooms"
              placeholder="Rooms"
              onChange={handleFilterRoomsChange}
            >
              <option value="1">+ 1</option>
              <option value="2">+ 2</option>
              <option value="3">+ 3</option>
              <option value="4">+ 4</option>
              <option value="5">+ 5</option>
            </Select>
            <Select
              maxW={{ base: "100%", md: "25%" }}
              onChange={handleFilterSurfaceChange}
              id="surface"
              placeholder="Surface"
            >
              <option value="60">+ 60mq</option>
              <option value="80">+ 80mq</option>
              <option value="100">+ 100mq</option>
            </Select>
          </Flex>
        </Flex>
        <Grid
          mt="10"
          gap={{ base: 5, md: 8 }}
          w="100%"
          gridTemplateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}
        >
          {filteredPeople.map((person) => (
            <InfoCard
              key={person.id}
              name={person.name}
              email={person.email}
              phone={person.phone}
              budget={person.search.budget}
              surface={person.search.surface}
              rooms={person.search.rooms}
            />
          ))}
        </Grid>
      </Box>
    </Flex>
  );
};
