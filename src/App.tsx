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
  TableSortLabel,
} from "@mui/material";
import "./App.css";
import { useEffect, useState, useMemo } from "react";

// Data
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
// Cabeçalho
interface HeadCell {
  id: keyof Character;
  label: string;
  numeric: boolean;
}

// Tipo de ordenação
type Order = "asc" | "desc";

const headCells: HeadCell[] = [
  {
    id: "name",
    label: "Nome",
    numeric: false,
  },
  {
    id: "height",
    label: "Altura",
    numeric: true,
  },
  {
    id: "hair_color",
    label: "Cor do cabelo	",
    numeric: false,
  },
  {
    id: "eye_color",
    label: "Cor dos olhos",
    numeric: false,
  },
  {
    id: "birth_year",
    label: "Data de aniversario",
    numeric: false,
  },
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  let result: number;
  if (b[orderBy] < a[orderBy]) {
    result = -1;
  } else if (b[orderBy] > a[orderBy]) {
    result = 1;
  } else {
    result = 0;
  }

  return result;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  let result;
  if (order === "desc") {
    result = (a: any, b: any) => descendingComparator(a, b, orderBy);
  } else {
    result = (a: any, b: any) => -descendingComparator(a, b, orderBy);
  }
  return result;
}

function stableSort<T>(array: Character[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  // Paginação
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  // Ordenação
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState("name");

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

  // Ordenação
  const createSortHeadle =
    (property: keyof Character) => (e: React.MouseEvent<unknown>) => {
      handleRequestSort(property);
    };

  const handleRequestSort = (property: keyof Character) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const visibleRows = useMemo(
    () =>
      stableSort(characters, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [characters, order, orderBy, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align="left"
                    padding="normal"
                    sortDirection={orderBy === headCell.id ? order : "asc"}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : "asc"}
                      onClick={createSortHeadle(headCell.id)}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>

              {visibleRows.map((row, index) => {
                return (
                  <TableRow>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.height}</TableCell>
                    <TableCell>{row.hair_color}</TableCell>
                    <TableCell>{row.eye_color}</TableCell>
                    <TableCell>{row.birth_year}</TableCell>
                  </TableRow>
                );
              })}
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
