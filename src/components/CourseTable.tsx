import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useEffect, useState } from "react";
import { TableHead } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import UseRegistration from "./UseRegistration";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

interface Course {
  registrationId: number;
  id: number;
  name: string;
  timeslot: string;
}

interface CourseTableProps {
  data: Course[];
  handleAlert: (title: string, message: string) => void;
}

export default function CourseTable({ data, handleAlert }: CourseTableProps) {
  const { registration, setRegistration } = UseRegistration();
  const registerNewCourse = (registrationId: number) => {
    let registeredTimes: string[] = [];
    let timeToRegister: string = "";
    data.forEach((course) => {
      if (registration?.includes(course.registrationId)) {
        registeredTimes.push(course.timeslot);
      } else if (course.registrationId == registrationId) {
        timeToRegister = course.timeslot;
      }
    });
    if (!registeredTimes?.includes(timeToRegister)) {
      if (registration) {
        setRegistration({ registration: [...registration, registrationId] });
      } else {
        setRegistration({ registration: [registrationId] });
      }
    } else {
      handleAlert("Timeslot taken", "Already registered on " + timeToRegister);
    }
  };

  const unregisterCourse = (registrationId: number) => {
    if (registration.includes(registrationId)) {
      setRegistration({
        registration: registration.filter(
          (oldRegistrationId) => oldRegistrationId !== registrationId
        ),
      });
    }
  };

  useEffect(() => {
    setRegistration({ registration: registration });
  }, [registration]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 900 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <StyledTableCell component="th" scope="row">
              Course Name
            </StyledTableCell>
            <StyledTableCell style={{ width: 160 }} align="left">
              Course ID
            </StyledTableCell>
            <StyledTableCell style={{ width: 260 }} align="left">
              Timeslot
            </StyledTableCell>
            <StyledTableCell style={{ width: 80 }} align="center">
              Register
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((row) => (
            <StyledTableRow key={row.registrationId} style={{ height: 75 }}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell style={{ width: 160 }} align="left">
                {row.id}
              </StyledTableCell>
              <StyledTableCell style={{ width: 260 }} align="left">
                {row.timeslot}
              </StyledTableCell>
              <StyledTableCell style={{ width: 80 }} align="center">
                {registration?.includes(row.registrationId) ? (
                  <IconButton
                    onClick={() => unregisterCourse(row.registrationId)}
                  >
                    <CheckIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => registerNewCourse(row.registrationId)}
                  >
                    <AddIcon />
                  </IconButton>
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
          {emptyRows > 0 && (
            <StyledTableRow style={{ height: 53 * emptyRows }}>
              <StyledTableCell colSpan={6} />
            </StyledTableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
