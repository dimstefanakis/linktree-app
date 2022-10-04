import { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
  Alert,
  AlertTitle,
  AlertDescription,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import ColorPicker from "../src/features/ColorPicker";
import AvatarPicker from "../src/features/AvatarPicker";
import createBrand from "../src/queries/createBrand";

function Create() {
  const toast = useToast();
  const router = useRouter();
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [textColor, setTextColor] = useState("white");
  const [linkColor, setLinkColor] = useState("blue.500");
  const [buttonColor, setButtonColor] = useState("gray.800");
  const [buttonTextColor, setButtonTextColor] = useState("white");
  const [loading, setLoading] = useState(false);

  // const [avatar, setAvatar] = useState("");
  const {
    handleSubmit,
    register,
    setError,
    control,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    console.log("errors", errors);
    let errorMessage = Object.values(errors).map((error) => {
      return error?.message;
    });
    if (errorMessage.length > 0) {
      toast({
        title: "Error",
        description: errorMessage.join(", "),
        status: "error",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
    }
  }, [errors]);

  function onSuccessToastClick() {
    const { username } = getValues();
    toast.closeAll();
    router.push(`/${username}`);
  }

  function handleErrors(data: any) {
    if (data.errors.username) {
      setError("username", {
        type: "manual",
        message: "Username already taken",
      });
    }
    if (
      data.errors.facebook_url ||
      data.errors.instagram_url ||
      data.errors.twitter_url ||
      data.errors.youtube_url ||
      data.erorrs.linkedin_url ||
      data.errors.website_url
    ) {
      setError("url", {
        type: "manual",
        message: "Invalid URL",
      });
    }
  }

  const onSubmit = async () => {
    const {
      name,
      username,
      avatar,
      intro,
      mission,
      websiteUrl,
      twitterUrl,
      instagramUrl,
      youtubeUrl,
      facebookUrl,
      linkedinUrl,
    } = getValues();
    let formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("logo", avatar);
    formData.append("intro", intro);
    formData.append("mission", mission);
    formData.append("website_url", websiteUrl);
    formData.append("twitter_url", twitterUrl);
    formData.append("instagram_url", instagramUrl);
    formData.append("youtube_url", youtubeUrl);
    formData.append("facebook_url", facebookUrl);
    formData.append("linkedin_url", linkedinUrl);
    formData.append(
      "color_palette",
      JSON.stringify({
        background_color: backgroundColor,
        text_color: textColor,
        link_color: linkColor,
        button_color: buttonColor,
        button_text_color: buttonTextColor,
      })
    );

    if (!avatar || !name || !username) {
      toast({
        title: "Error",
        description:
          "Please fill out all required fields (logo, name, username)",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setLoading(true);
    let response = await createBrand(formData)
      .then((res) => {
        setLoading(false);
        if (res.data.errors) {
          handleErrors(res.data);
          return;
        }
        toast({
          status: "success",
          duration: 100000,
          isClosable: true,
          position: "top",
          render: () => (
            <Alert status="success" variant="solid" borderRadius="md">
              <Flex flexFlow="column">
                <AlertTitle>Brand created!</AlertTitle>
                <AlertDescription>
                  We have created your brand for you.
                </AlertDescription>
                <Button
                  onClick={onSuccessToastClick}
                  colorScheme="green"
                  background="green.300"
                  mt={5}
                >
                  Click here to view it
                </Button>
              </Flex>
            </Alert>
          ),
        });
        console.log("res", res);
      })
      .catch((err) => {
        setLoading(false);
        toast({
          title: "An error occurred.",
          description: "Please try again.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
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
          <InputLeftAddon>https://linktree.com/</InputLeftAddon>
          <Input placeholder="mylinktree" {...register("username")} />
        </InputGroup>
        <Input placeholder="Brand Name" {...register("name")} />

        <Textarea placeholder="Write a small intro..." {...register("intro")} />
        <Textarea
          placeholder="Write your mission..."
          {...register("mission")}
        />
        <Input placeholder="Website URL" {...register("websiteUrl")} />
        <Input placeholder="Twitter URL" {...register("twitterUrl")} />
        <Input placeholder="Instagram URL" {...register("instagramUrl")} />
        <Input placeholder="Facebook URL" {...register("facebookUrl")} />
        <Input placeholder="YouTube URL" {...register("youtubeUrl")} />
        <Input placeholder="LinkedIn URL" {...register("linkedinUrl")} />
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
      <Button
        isLoading={loading}
        colorScheme="blue"
        size="lg"
        my={10}
        onClick={onSubmit}
      >
        Create Brand
      </Button>
    </Flex>
  );
}

export default Create;
