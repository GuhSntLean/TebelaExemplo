import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import "./App.css";
import { useEffect, useState } from "react";

interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: [string];
  species: [string];
  vehicles: [string];
  starships: [string];
  created: string;
  edited: string;
  url: string;
}

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  // Paginação
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  useEffect(() => {
    const listPersons = async () => {
      const dataFetch = await fetch("https://swapi.dev/api/people");
      const response = await dataFetch.json();

      setCharacters(response.results);
      console.log(characters);
    };
    listPersons();
  });

  // Paginação
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Altura</TableCell>
                <TableCell>Cor do cabelo</TableCell>
                <TableCell>Cor dos olhos</TableCell>
                <TableCell>Data de aniversario</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {characters.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((character) => (
                <TableRow>
                  <TableCell>{character.name}</TableCell>
                  <TableCell>{character.height}</TableCell>
                  <TableCell>{character.hair_color}</TableCell>
                  <TableCell>{character.eye_color}</TableCell>
                  <TableCell>{character.birth_year}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[3, 5, 10]}
          component="div"
          count={characters.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default App;
