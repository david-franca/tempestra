import { ChangeEvent, useEffect, useRef, useState } from "react";
import { IoLocation } from "react-icons/io5";

import { GeolocationData, Result } from "@/types";
import {
  Box,
  Center,
  Input,
  List,
  ListIcon,
  ListItem,
  Spinner,
  useOutsideClick,
  VStack,
} from "@chakra-ui/react";
import { useSelectedItem } from "@/context/SelectedItemContext";

const fetchResults = async (term: string) => {
  const lowerCaseTerm = term?.toLowerCase();

  return fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${lowerCaseTerm}&count=5&language=pt_br&format=json`
  )
    .then((response) => response.json())
    .then((data: GeolocationData) => {
      return data.results || [];
    });
};

export const SearchComponent = () => {
  const { setSelectedItem, selectedItem } = useSelectedItem();
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Result[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    clearTimeout(timerRef.current as NodeJS.Timeout);
    if (value) {
      setLoading(true);
      timerRef.current = setTimeout(async () => {
        const res = await fetchResults(value);
        setResults(res);
        setIsOpen(true);
        setLoading(false);
      }, 500);
    } else {
      setResults([]);
      setIsOpen(false);
      setLoading(false);
    }
  };

  const handleItemClick = (item: Result) => {
    setSelectedItem(item);
    setQuery(
      `${item.name}, ${item.admin1 ? item.admin1 + "," : ""} ${
        item.country_code
      }`
    );
    setIsOpen(false);
  };

  useOutsideClick({
    ref: resultsRef,
    handler: () => setIsOpen(false),
  });

  useEffect(() => {
    if (selectedItem) {
      setQuery(
        `${selectedItem.name}, ${
          selectedItem.admin1 ? selectedItem.admin1 + "," : ""
        } ${selectedItem.country_code}`
      );
    } else {
      setQuery("Nemo");
    }
  }, [selectedItem]);

  return (
    <VStack
      spacing={4}
      width="full"
      mx="auto"
      color="white"
      position="relative"
    >
      <Input
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && results.length > 0 && (
        <Box
          ref={resultsRef}
          position="absolute"
          top="100%"
          zIndex="10"
          border="1px"
          mt={2}
          w="full"
          borderColor="gray.200"
          borderRadius="md"
          boxShadow="lg"
          bg="teal.900"
        >
          {loading ? (
            <Center p={4}>
              <Spinner />
            </Center>
          ) : (
            <List spacing={3}>
              {results.map((result) => (
                <ListItem
                  key={result.id}
                  padding="2"
                  cursor="pointer"
                  _hover={{ bg: "teal.700" }}
                  borderRadius="md"
                  onClick={() => handleItemClick(result)}
                >
                  <ListIcon as={IoLocation} color="teal.500" />
                  {`${result.name}, ${
                    result.admin1 ? result.admin1 + "," : ""
                  } ${result.country_code}`}
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      )}
    </VStack>
  );
};
