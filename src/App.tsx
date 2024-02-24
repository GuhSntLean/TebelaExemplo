import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "./App.css";

function App() {
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Campo 1</TableCell>
                <TableCell>Campo 2</TableCell>
                <TableCell>Campo 3</TableCell>
                <TableCell>Campo 4</TableCell>
                <TableCell>Campo 5</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Campo 1</TableCell>
                <TableCell>Campo 2</TableCell>
                <TableCell>Campo 3</TableCell>
                <TableCell>Campo 4</TableCell>
                <TableCell>Campo 5</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Campo 1</TableCell>
                <TableCell>Campo 2</TableCell>
                <TableCell>Campo 3</TableCell>
                <TableCell>Campo 4</TableCell>
                <TableCell>Campo 5</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Campo 1</TableCell>
                <TableCell>Campo 2</TableCell>
                <TableCell>Campo 3</TableCell>
                <TableCell>Campo 4</TableCell>
                <TableCell>Campo 5</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default App;
