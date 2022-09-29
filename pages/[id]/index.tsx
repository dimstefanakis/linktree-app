import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { Flex, Avatar, Link, Box, Text, VStack } from "@chakra-ui/react";
import { brandAtom } from "../../src/store/brand";
import LinkButton from "../../src/flat/Layout/LinkButton";
import axios from "axios";

function Brand() {
  const router = useRouter();
  const [brand, setBrand] = useState<any>(null);
  const [brandAtomValue, setBrandAtomValue] = useAtom(brandAtom);
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/v1/brands/${id}`)
        .then((res) => {
          setBrand(res.data);
        });
    }
  }, [id]);

  useEffect(() => {
    if (brand) {
      console.log("brand", brand)
      setBrandAtomValue({
        name: brand.name,
        intro: brand.intro,
        mission: brand.mission,
        backgroundColor: brand.color_palette.background_color,
        textColor: brand.color_palette.text_color,
        linkColor: brand.color_palette.link_color,
        buttonColor: brand.color_palette.button_color,
        buttonTextColor: brand.color_palette.button_text_color,
        logo: brand.logo,
        url: brand.website_url,
        twitter: brand.twitter_url,
        font: brand.font,
      });
    }
  }, [brand]);

  return (
    <Flex flexFlow="column" alignItems="center" maxW="400" mt={10}>
      {brand && (
        <>
          <Avatar size="2xl" name={brand.name} src={brand.logo} mb={5} />
          <Text fontSize="4xl" fontWeight="bold">
            {brand.name}
          </Text>
          <Text fontSize="xs" mt={-2} mb={5}>
            @{brand.username}
          </Text>
          <Text textAlign="center" fontSize="xl" mb={5}>
            {brand.intro}
          </Text>
          <Text fontSize="sm" mb={5}>
            {brand.mission}
          </Text>
          <VStack w="100%" my={5}>
            {brand.website_url && (
              <LinkButton href={brand.website_url}>Website</LinkButton>
            )}
            {brand.twitter_url && (
              <LinkButton href={brand.twitter_url}>Twitter</LinkButton>
            )}
            {brand.facebook_url && (
              <LinkButton href={brand.facebook_url}>Facebook</LinkButton>
            )}
            {brand.instagram_url && (
              <LinkButton href={brand.instagram_url}>Instagram</LinkButton>
            )}
            {brand.youtube_url && (
              <LinkButton href={brand.youtube_url}>YouTube</LinkButton>
            )}
            {brand.tiktok_url && (
              <LinkButton href={brand.tiktok_url}>TikTok</LinkButton>
            )}
            {brand.pinterest_url && (
              <LinkButton href={brand.pinterest_url}>Pinterest</LinkButton>
            )}
            {brand.linkedin_url && (
              <LinkButton href={brand.linkedin_url}>LinkedIn</LinkButton>
            )}
          </VStack>
        </>
      )}
    </Flex>
  );
}

export default Brand;
