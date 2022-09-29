import { Flex } from "@chakra-ui/react";

interface LayoutProps {
    children: React.ReactNode;
}
function Layout({children}: LayoutProps){
    return (
      <Flex w="100vw" minH="100vh" h="100%" justifyContent="center">
        <Flex justifyContent="center" maxW="800px" w="100%">
          {children}
        </Flex>
      </Flex>
    );
}

export default Layout;
