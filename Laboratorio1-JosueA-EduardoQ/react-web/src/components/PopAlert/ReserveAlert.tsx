import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, useToast } from "@chakra-ui/react"
import React from "react"
import putData from "../../utils/putData";

export interface ReserveAlertProps {
  value: number
}

const ReserveAlert: React.FC<ReserveAlertProps> = ({value, children}) => {
    const [isOpen, setIsOpen] = React.useState(false)

    const toast = useToast();

    const onConfirm = () => {
      setIsOpen(false)
      toast({
        title: "Space Reserved!",
        description: "Refresh the app to see your changes.",
        status: "success",
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
                Reserve Spot
              </AlertDialogHeader>
  
              <AlertDialogBody>
                Are you sure you want to reserve this spot?
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="green"
                  onClick={() => {
                    putData(`http://127.0.0.1:3005/spaces/${value}`, {state:"in-use"})
                    onConfirm();
                  }}
                  ml={3}>
                  Reserve
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }

export default ReserveAlert;