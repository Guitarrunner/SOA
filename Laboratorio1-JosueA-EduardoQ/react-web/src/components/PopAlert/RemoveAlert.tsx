import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, useToast } from "@chakra-ui/react"
import React from "react"
import putData from "../../utils/putData";

export interface RemoveAlertProps {
  value: number
}

const RemoveAlert: React.FC<RemoveAlertProps> = ({value, children}) => {

    const [isOpen, setIsOpen] = React.useState(false)

    const toast = useToast();

    const onConfirm = () => {
      setIsOpen(false)
      toast({
        title: "Reserve Removed!",
        description: "Refresh the app to see your changes.",
        status: "error",
        duration: 5000,
        isClosable: true,
    });
    }

    const onClose = () => setIsOpen(false);

    const cancelRef = React.useRef()
  
    return (
      <>
        <Box as="button" onClick={() => setIsOpen(true)}>
            {children}
        </Box>
  
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Remove Spot
              </AlertDialogHeader>
  
              <AlertDialogBody>
                Are you sure you want to remove this spot?
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" 
                onClick={() => {
                  putData(`http://127.0.0.1:3005/spaces/${value}`, {state:"free"})
                  onConfirm();
                }} 
                ml={3}>
                  Remove
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }

export default RemoveAlert;