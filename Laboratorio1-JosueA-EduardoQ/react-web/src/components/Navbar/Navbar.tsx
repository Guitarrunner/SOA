import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Flex, Box, Heading, Spacer } from "@chakra-ui/layout";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { useToast } from "@chakra-ui/toast";
import React from "react";
import deleteData from "../../utils/deleteData";
import postData from "../../utils/postData";


export interface NavbarProps {
    
}
 
const Navbar: React.FC<NavbarProps> = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [value, setValue] = React.useState("")
    const handleChange = (event) => setValue(event.target.value);

    const toast = useToast();

    return ( 
        <Flex bg="teal" padding="10px" marginBottom="5px">
            <Box p="2">
                <Heading size="md">ParkingTEC</Heading>
            </Box>
            <Spacer />
            <Box>
                <Button mr={1} colorScheme="blue"
                    onClick={
                        () => {
                            window.location.reload();
                        }
                    }
                >Refresh</Button>
                <Button mr={1} colorScheme="green"
                    onClick={() => {

                        const response = postData({}, 'http://127.0.0.1:3005/spaces');
                        console.log(response);

                        toast({
                            title: "Space Added!",
                            description: "Refresh the app to see your changes.",
                            status: "success",
                            duration: 5000,
                            isClosable: true,
                        })
                    }}
                >Add Space</Button>
                <Button colorScheme="red" 
                    onClick={onOpen}>Remove Space</Button>
            </Box>

            <Modal
        
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Space Remover</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                    <FormLabel>Spot ID</FormLabel>
                    <Input value={value}
                        onChange={handleChange}
                        placeholder="ID" />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="red" mr={3}
                        onClick={() => {

                            if(value === ""){
                                toast({
                                    title: "You have to write an ID!",
                                    status: "error",
                                    duration: 5000,
                                    isClosable: true,
                                });
                                return
                            }

                            deleteData(`http://127.0.0.1:3005/spaces/${value}`);
                            onClose();
                            toast({
                                    title: "Space Removed!",
                                    description: "Refresh the app to see your changes.",
                                    status: "error",
                                    duration: 5000,
                                    isClosable: true,
                                });
                        }}
                    >
                    Remove
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>


        </Flex>
     );
}
 
export default Navbar;