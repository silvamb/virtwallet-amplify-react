import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const BasicDataTable = ({ headers, rows, name = "table", size }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label={name} size={size}>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={`header-${index}`}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => {
            return (
              <TableRow key={`row-${rowIndex}`}>
                {row.map((cell, cellIndex) => (
                  <TableCell key={`row-${rowIndex}-${cellIndex}`}>
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicDataTable;