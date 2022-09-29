import { useState } from "react";
import {
  Box,
  ChakraProvider,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Center,
  SimpleGrid,
  Input,
} from "@chakra-ui/react";

interface ColorPickerProps {
  color: string;
  setColor: (color: string) => void;
  placeholder: string;
}

function ColorPicker({ color, setColor, placeholder }: ColorPickerProps) {
  //   const [color, setColor] = useState("gray.500");

  const colors = [
    "gray.500",
    "red.500",
    "gray.700",
    "green.500",
    "blue.500",
    "blue.800",
    "yellow.500",
    "orange.500",
    "purple.500",
    "pink.500",
  ];

  return (
    <Center marginTop={5} w="100%">
      <Popover variant="picker">
        <PopoverTrigger>
          <Button
            size="sm"
            aria-label={color}
            background={color}
            padding={0}
            w="100%"
            color={
              color === "white" || color == "#fff" || color == "#ffffff"
                ? "black"
                : "white"
            }
            borderRadius={3}
          >
            {placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent width="170px">
          <PopoverArrow bg={color} />
          <PopoverCloseButton color="white" />
          <PopoverHeader
            height="100px"
            backgroundColor={color}
            borderTopLeftRadius={5}
            borderTopRightRadius={5}
            color="white"
          >
            <Center height="100%">{color}</Center>
          </PopoverHeader>
          <PopoverBody height="120px">
            <SimpleGrid columns={5} spacing={2}>
              {colors.map((c) => (
                <Button
                  key={c}
                  aria-label={c}
                  background={c}
                  height="22px"
                  width="22px"
                  padding={0}
                  minWidth="unset"
                  borderRadius={3}
                  _hover={{ background: c }}
                  onClick={() => {
                    setColor(c);
                  }}
                ></Button>
              ))}
            </SimpleGrid>
            <Input
              borderRadius={3}
              marginTop={3}
              placeholder="red.100"
              size="sm"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
              }}
            />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Center>
  );
}

export default ColorPicker;
