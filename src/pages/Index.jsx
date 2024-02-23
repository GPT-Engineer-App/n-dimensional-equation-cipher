import { Box, Button, Container, Heading, Input, Stack, Text, Textarea, useToast } from "@chakra-ui/react";
import { FaLock, FaUnlock } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const [equation, setEquation] = useState("");
  const [solution, setSolution] = useState(null);
  const [cipherText, setCipherText] = useState("");
  const [plainText, setPlainText] = useState("");
  const toast = useToast();

  // Dummy function to 'solve' an equation (for demonstration purposes)
  const solveEquation = (equation) => {
    // The 'solution' would be the length of the equation string for this example
    const solution = equation.length;
    setSolution(solution);
    toast({
      title: "Equation Solved",
      description: `The solution is: ${solution}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // Dummy encryption function using a simple shift cipher based on the solution
  const encryptText = (text, shift) => {
    let encrypted = "";
    for (let i = 0; i < text.length; i++) {
      encrypted += String.fromCharCode((text.charCodeAt(i) + shift) % 256);
    }
    setCipherText(encrypted);
  };

  // Dummy decryption function using a simple shift cipher based on the solution
  const decryptText = (text, shift) => {
    let decrypted = "";
    for (let i = 0; i < text.length; i++) {
      decrypted += String.fromCharCode((text.charCodeAt(i) - shift + 256) % 256);
    }
    setPlainText(decrypted);
  };

  return (
    <Container maxW="container.md" py={10}>
      <Stack spacing={5}>
        <Heading as="h1">Equation Solver & Cipher Tool</Heading>
        <Text>Enter an equation or function to solve:</Text>
        <Input placeholder="e.g., x^2 + y^2 = z^2" value={equation} onChange={(e) => setEquation(e.target.value)} />
        <Button colorScheme="blue" onClick={() => solveEquation(equation)}>
          Solve Equation
        </Button>
        <Text>
          {solution !== null && (
            <>
              Solution: <strong>{solution}</strong>
            </>
          )}
        </Text>
        <Textarea placeholder="Enter text to encrypt" value={plainText} onChange={(e) => setPlainText(e.target.value)} isDisabled={solution === null} />
        <Button leftIcon={<FaLock />} colorScheme="green" onClick={() => encryptText(plainText, solution)} isDisabled={solution === null}>
          Encrypt Text
        </Button>
        <Textarea placeholder="Enter text to decrypt" value={cipherText} onChange={(e) => setCipherText(e.target.value)} isDisabled={solution === null} />
        <Button leftIcon={<FaUnlock />} colorScheme="orange" onClick={() => decryptText(cipherText, solution)} isDisabled={solution === null}>
          Decrypt Text
        </Button>
        <Box>
          <Text fontWeight="bold">Encrypted:</Text>
          <Text as="i">{cipherText}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Decrypted:</Text>
          <Text as="i">{plainText}</Text>
        </Box>
      </Stack>
    </Container>
  );
};

export default Index;
