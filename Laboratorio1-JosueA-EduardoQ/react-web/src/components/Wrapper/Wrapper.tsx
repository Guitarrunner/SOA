import { Container } from "@chakra-ui/layout";

export interface WrapperProps {

}
 
const Wrapper: React.FC<WrapperProps> = ({ children }) => {

    return ( 

        <Container maxW="container.sm">
            {children}
        </Container>

     );
}
 
export default Wrapper;