import { Table, TableCaption, Thead, Tr, Th, Tbody, Td, IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import ReserveAlert from "../PopAlert/ReserveAlert";
import RemoveAlert from "../PopAlert/RemoveAlert"

export interface SpacesTableProps {
    
}
 
const SpacesTable: React.FC<SpacesTableProps> = () => {

    const [data, updateData] = useState([]);

    useEffect(() => {
        const getData = async () => {
          const resp = await fetch('http://127.0.0.1:3005/spaces');
          const json = await resp.json();
          updateData(json.results);
        }
        getData();
      }, []);

    return ( 
    <Table size="sm" variant="striped" colorScheme="teal">
    <TableCaption>This WebApp consumes the GET, POST, PUT and DELETE of the api/spaces endpoint</TableCaption>
    <Thead>
      <Tr>
        <Th textAlign="center">Parking Spot</Th>
        <Th textAlign="center">State</Th>
        <Th textAlign="center">Reserve</Th>
      </Tr>
    </Thead>
    <Tbody>
    {
        data.map((object, i) => {

            return (
                <Tr key={i}>
                    <Td textAlign="center">{object.id}</Td>
                    <Td textAlign="center">{object.state}</Td>
                    <Td textAlign="center">
                      {
                        (object.state !== "in-use") ? 
                        <ReserveAlert value={object.id}>
                        <IconButton
                          variant="outline" 
                          colorScheme="green" 
                          aria-label="Reserve" size="sm" 
                          icon={<CheckIcon />} 
                        />
                        </ReserveAlert>
                         : 

                        <RemoveAlert value={object.id}>
                        <IconButton
                          variant="outline"  
                          colorScheme="red" 
                          aria-label="Delete" 
                          size="sm" 
                          icon={<CloseIcon />} 
                        />
                        </RemoveAlert>
                      } 
                    </Td>
                </Tr>
            )
        })
    }
    </Tbody>
  </Table>
);
}
 
export default SpacesTable;