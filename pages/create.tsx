import { useState } from "react";
import {
  Flex,
  Box,
  Text,
  Input,
  Avatar,
  VStack,
  InputLeftAddon,
  InputRightAddon,
  InputGroup,
  Textarea,
  Button,
  Center,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import ColorPicker from "../src/features/ColorPicker";
import AvatarPicker from "../src/features/AvatarPicker";
import createBrand from "../src/queries/createBrand";

function Create() {
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [textColor, setTextColor] = useState("white");
  const [linkColor, setLinkColor] = useState("blue.500");
  const [buttonColor, setButtonColor] = useState("gray.800");
  const [buttonTextColor, setButtonTextColor] = useState("white");

  // const [avatar, setAvatar] = useState("");
  const {
    handleSubmit,
    register,
    setError,
    control,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = () => {
    const { name, username, avatar, intro, mission, websiteUrl, twitterUrl } =
      getValues();
    let formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("logo", avatar);
    formData.append("intro", intro);
    formData.append("mission", mission);
    formData.append("website_url", websiteUrl);
    formData.append("twitter_url", twitterUrl);
    formData.append(
      "color_palette",
      JSON.stringify({ background_color: backgroundColor })
    );

    createBrand(formData)
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <Flex flexFlow="column">
      <Box my={10}>
        <AvatarPicker control={control} />
      </Box>
      <VStack>
        <InputGroup size="sm">
          <InputLeftAddon>https://</InputLeftAddon>
          <Input placeholder="mylinktree" {...register("username")} />
          <InputRightAddon>.com</InputRightAddon>
        </InputGroup>
        <Input placeholder="Brand Name" {...register("name")} />

        <Textarea placeholder="Write a small intro..." {...register("intro")} />
        <Textarea
          placeholder="Write your mission..."
          {...register("mission")}
        />
        <Input placeholder="Website URL" {...register("websiteUrl")} />
        <Input placeholder="Twitter URL" {...register("twitterUrl")} />
        <Flex></Flex>
        <ColorPicker
          color={backgroundColor}
          setColor={setBackgroundColor}
          placeholder="My brands background color"
        />
        <ColorPicker
          color={textColor}
          setColor={setTextColor}
          placeholder="My brands text color"
        />
        <ColorPicker
          color={linkColor}
          setColor={setLinkColor}
          placeholder="My brands link color"
        />
        <ColorPicker
          color={buttonColor}
          setColor={setButtonColor}
          placeholder="My brands button color"
        />
        <ColorPicker
          color={buttonTextColor}
          setColor={setButtonTextColor}
          placeholder="My brands button text color"
        />
      </VStack>
      <Button colorScheme="blue" size="lg" my={10} onClick={onSubmit}>
        Create Brand
      </Button>
    </Flex>
  );
}

export default Create;
