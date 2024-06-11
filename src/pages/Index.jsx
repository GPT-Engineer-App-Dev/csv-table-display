import React, { useState } from "react";
import { Container, VStack, Text, Input, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import Papa from "papaparse";

const Index = () => {
  const [tableData, setTableData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/csv") {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setHeaders(Object.keys(results.data[0]));
          setTableData(results.data);
        },
      });
    } else {
      alert("Please upload a valid CSV file.");
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Upload CSV File</Text>
        <Input type="file" accept=".csv" onChange={handleFileUpload} />
        {tableData.length > 0 && (
          <Table variant="simple" mt={4}>
            <Thead>
              <Tr>
                {headers.map((header, index) => (
                  <Th key={index}>{header}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {tableData.map((row, rowIndex) => (
                <Tr key={rowIndex}>
                  {headers.map((header, colIndex) => (
                    <Td key={colIndex}>{row[header]}</Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </VStack>
    </Container>
  );
};

export default Index;