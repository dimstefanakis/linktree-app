import NextLink from "next/link";
import { Button, Link } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { brandAtom } from "../../../store/brand";

interface LinkButton {
  children: string | React.ReactNode;
  href: string;
}

function LinkButton({ children, href }: LinkButton) {
  const [brand] = useAtom(brandAtom);

  function onClick() {
    window.location.href = href;
  }

  return (
    <Button
      onClick={onClick}
      size="lg"
      w="100%"
      textColor={brand.buttonTextColor}
      backgroundColor={brand.buttonColor}
      _hover={{ bg: brand.buttonColor }}
      _active={{
        bg: brand.buttonColor,
      }}
    >
      {children}
    </Button>
  );
}

export default LinkButton;
