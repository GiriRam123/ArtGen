import {
  Box,
  Button,
  ChakraProvider,
  Heading,
  Image,
  Input,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
  Wrap,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { FaMagic } from "react-icons/fa";

const App = () => {
  const [image, updateImage] = useState();
  const [prompt, updatePrompt] = useState();
  const [loading, updateLoading] = useState(false);

  const generate = async (prompt) => {
    updateLoading(true);
    const result = await axios.get(`http://127.0.0.1:8000/?prompt=${prompt}`);
    updateImage(result.data);
    updateLoading(false);
  };

  return (
    <ChakraProvider>
      <Box
        bg="rgba(255, 255, 255, 0.8)" // Light transparent look
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgGradient="linear(to-l, #ADD8E6, #87CEFA, #00BFFF, #1E90FF, #4169E1, #6A5ACD, #7B68EE)" // Light blue gradient background
      >
        <Box
          bg="white"
          borderRadius="lg"
          boxShadow="2xl"
          p={8}
          color="black"
          maxW="lg"
          textAlign="center"
          animation="fadeIn 1.5s"
          _hover={{
            boxShadow: "lg",
            transition: "all 0.2s ease-in-out",
            transform: "scale(1.02)",
          }}
        >
          <Heading mb={4}>🧚‍♂️ArtGen: Interactive Image Generation with Stable Diffusion🧚‍♂️</Heading>

          <Text mb={6}>
            This React application offers a user-friendly interface for image generation powered by a cutting-edge Stable Diffusion model. This model, born from a collaboration between Stability AI and Runway ML, pushes the boundaries of creative exploration by enabling users to generate unique and captivating visuals directly within the application.
          </Text>

          <Wrap justify="center" mb={6}>
            <Input
              value={prompt}
              onChange={(e) => updatePrompt(e.target.value)}
              width={"300px"}
              bg="white"
              color="black"
              placeholder="Enter your prompt"
              _placeholder={{ color: "gray.500" }}
              borderRadius="md"
              boxShadow="md"
              mr={2}
            />
            <Button
              onClick={() => generate(prompt)}
              colorScheme="blue"
              leftIcon={<FaMagic />}
              isLoading={loading}
              loadingText="Generating"
              _hover={{
                boxShadow: "lg",
                transition: "all 0.2s ease-in-out",
                transform: "scale(1.02)",
              }}
              // Additional styling for neon glow effect
              _after={{
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: -1,
                borderRadius: "inherit",
                background: "linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)", // Instagram logo colors
                opacity: 0.5,
                transition: "opacity 0.3s ease-out",
              }}
            >
              Generate
            </Button>
          </Wrap>

          {loading ? (
            <Stack>
              <SkeletonCircle size="12" />
              <SkeletonText mt={4} noOfLines={4} spacing="4" />
            </Stack>
          ) : image ? (
            <Image
              src={`data:image/png;base64,${image}`}
              boxShadow="lg"
              maxH="400px"
              mt={4}
              borderRadius="md"
              animation="fadeIn 1.5s"
            />
          ) : null}

          <Text mt={4} fontSize="sm" color="gray.500">
            Developed by{" "}
            <span style={{
              fontWeight: "bold",
              display: "inline-block",
            }}>
              <span style={{
                backgroundImage: "linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)", // Instagram logo colors
                WebkitBackgroundClip: "text",
                color: "transparent",
                animation: "rainbow-text-animation 2s infinite",
              }}>
                Giri Ram V S
              </span>
            </span>
          </Text>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default App;
