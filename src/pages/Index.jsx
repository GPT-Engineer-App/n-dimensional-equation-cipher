import { Box, Button, Container, Heading, Input, Select, Stack, Text, Textarea, useToast, VStack } from "@chakra-ui/react";
import { FaLock, FaUnlock } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const encryptionMethods = ["Shift Cipher", "Reverse Cipher", "RSA Cipher", "Lattice Cipher"];
  const [equation, setEquation] = useState("");
  const [solution, setSolution] = useState(null);
  const [cipherText, setCipherText] = useState("");
  const [plainText, setPlainText] = useState("");
  const [encryptionKey, setEncryptionKey] = useState("");
  const [encryptionMethod, setEncryptionMethod] = useState(encryptionMethods[0]);
  const toast = useToast();

  // Function to calculate a simple mathematical expression
  const solveEquation = (eq) => {
    try {
      // Evaluate the equation as a JavaScript expression
      // Note: This is not safe or recommended for production use!
      // It is only for demonstration purposes as we're not allowed to use external libraries
      const solution = Function('"use strict";return (' + eq + ")")();
      setSolution(solution);
      toast({
        title: "Equation Solved",
        description: `The solution is: ${solution}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error Solving Equation",
        description: "There was an error evaluating the equation. Please check the syntax.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Mock RSA encryption function
  const rsaEncrypt = (text, key) => {
    // This is a simple mock and does not represent actual RSA encryption
    return `rsa-${text}`;
  };

  // Mock Lattice encryption function
  const latticeEncrypt = (text, key) => {
    // This is a simple mock and does not represent actual Lattice encryption
    return `lattice-${text}`;
  };

  // Updated encryption function that uses the selected encryption method and key
  const encryptText = (text, key, method) => {
    // Convert input text to Unicode numbers
    const unicodeText = text
      .split("")
      .map((char) => char.charCodeAt(0))
      .join(" ");
    let encrypted = "";
    switch (method) {
      case "Shift Cipher":
        encrypted = unicodeText
          .split(" ")
          .map((num) => String.fromCharCode((parseInt(num, 10) + parseInt(key, 10)) % 256))
          .join("");
        break;
      case "Reverse Cipher":
        encrypted = unicodeText.split("").reverse().join("");
        break;
      case "RSA Cipher":
        encrypted = rsaEncrypt(unicodeText, key);
        break;
      case "Lattice Cipher":
        encrypted = latticeEncrypt(unicodeText, key);
        break;
      default:
        encrypted = unicodeText; // In case no encryption method is selected
        break;
    }
    setCipherText(encrypted);
  };
  // Removed the duplicate definition of encryptText function

  // Updated decryption function that uses the selected encryption method and key
  const decryptText = (text, key, method) => {
    let shift = parseInt(key, 10) || 0;
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
        <Select placeholder="Select Encryption Method" value={encryptionMethod} onChange={(e) => setEncryptionMethod(e.target.value)}>
          {encryptionMethods.map((method, index) => (
            <option key={index} value={method}>
              {method}
            </option>
          ))}
        </Select>
        <Input placeholder="Enter an encryption key" value={encryptionKey} onChange={(e) => setEncryptionKey(e.target.value)} isDisabled={encryptionMethod === ""} />
        <Textarea placeholder="Enter text to encrypt" value={plainText} onChange={(e) => setPlainText(e.target.value)} isDisabled={encryptionMethod === ""} />
        <Button leftIcon={<FaLock />} colorScheme="green" onClick={() => encryptText(plainText, encryptionKey, encryptionMethod)} isDisabled={encryptionMethod === ""}>
          Encrypt Text
        </Button>
        <Textarea placeholder="Enter text to decrypt" value={cipherText} onChange={(e) => setCipherText(e.target.value)} isDisabled={encryptionMethod === ""} />
        <Button leftIcon={<FaUnlock />} colorScheme="orange" onClick={() => decryptText(cipherText, encryptionKey, encryptionMethod)} isDisabled={encryptionMethod === ""}>
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
