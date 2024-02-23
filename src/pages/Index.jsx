import { Box, Button, Container, Heading, Input, Select, Stack, Text, Textarea, useToast } from "@chakra-ui/react";
import { FaLock, FaUnlock } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const encryptionMethods = ["Shift Cipher", "Reverse Cipher"];
  const [equation, setEquation] = useState("");
  const [solution, setSolution] = useState(null);
  const [cipherText, setCipherText] = useState("");
  const [plainText, setPlainText] = useState("");
  const [encryptionMethod, setEncryptionMethod] = useState(encryptionMethods[0]);
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

  // Encryption function that uses the selected encryption method
  const encryptText = (text, shift, method) => {
    let encrypted = "";
    switch (method) {
      case "Shift Cipher":
        for (let i = 0; i < text.length; i++) {
          encrypted += String.fromCharCode((text.charCodeAt(i) + shift) % 256);
        }
        break;
      case "Reverse Cipher":
        encrypted = text.split("").reverse().join("");
        break;
      default:
        encrypted = text; // In case no encryption method is selected
        break;
    }
    setCipherText(encrypted);
  };

  // Decryption function that uses the selected encryption method
  const decryptText = (text, shift, method) => {
    let decrypted = "";
    switch (method) {
      case "Shift Cipher":
        for (let i = 0; i < text.length; i++) {
          decrypted += String.fromCharCode((text.charCodeAt(i) - shift + 256) % 256);
        }
        break;
      case "Reverse Cipher":
        decrypted = text.split("").reverse().join("");
        break;
      default:
        decrypted = text; // In case no decryption method is selected
        break;
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
        <Select placeholder="Select Encryption Method" onChange={(e) => setEncryptionMethod(e.target.value)} isDisabled={solution === null}>
          {encryptionMethods.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </Select>
        <Textarea placeholder="Enter text to encrypt" value={plainText} onChange={(e) => setPlainText(e.target.value)} isDisabled={solution === null || encryptionMethod === ""} />
        <Button leftIcon={<FaLock />} colorScheme="green" onClick={() => encryptText(plainText, solution, encryptionMethod)} isDisabled={solution === null || encryptionMethod === ""}>
          Encrypt Text
        </Button>
        <Textarea placeholder="Enter text to decrypt" value={cipherText} onChange={(e) => setCipherText(e.target.value)} isDisabled={solution === null} />
        <Button leftIcon={<FaUnlock />} colorScheme="orange" onClick={() => decryptText(cipherText, solution, encryptionMethod)} isDisabled={solution === null || encryptionMethod === ""}>
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
