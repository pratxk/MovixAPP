import React from 'react';
import { Box, Container, Flex, Text, Link, HStack, Icon } from '@chakra-ui/react';
import { FaFacebookF, FaInstagram, FaGithub, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box as="footer" bg='#0a101c' h='350px' color="gray.400" py={8}>
      <Container maxW="container.xl" mt='50px' bg='#0a101c' >
        <Flex direction="column" bg='#0a101c'  align="center">
          <HStack spacing={4} bg='#0a101c' mb={4}>
            <Link href="/terms">Terms Of Use</Link>
            <Link href="/privacy">Privacy-Policy</Link>
            <Link href="/about">About</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/faq">FAQ</Link>
          </HStack>
          
          <Text textAlign="center" bg='#0a101c'  fontSize="sm" mb={6} maxW="container.md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
            in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </Text>
          
          <HStack bg='#0a101c' spacing={4}>
            <SocialIcon icon={FaFacebookF} href="https://facebook.com" />
            <SocialIcon icon={FaInstagram} href="https://instagram.com" />
            <SocialIcon icon={FaGithub} href="https://github.com" />
            <SocialIcon icon={FaLinkedinIn} href="https://linkedin.com" />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

const SocialIcon = ({ icon, href }) => (
  <Link href={href} isExternal>
    <Box
      as="span"
      w={10}
      h={10}

      color="white"
      rounded="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
      transition="all 0.3s"
      _hover={{ bg: 'gray.700' }}
    >
      <Icon as={icon} />
    </Box>
  </Link>
);

export default Footer;