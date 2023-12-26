import { Box } from "@mui/material";
import SearchBar from "./SearchBar";
import CourseTable from "./CourseTable";
import { useState } from "react";
import AlertDialog from "./AlertDialog";

interface Course {
  registrationId: number;
  id: number;
  name: string;
  timeslot: string;
}

interface SearchAndTableProps {
  data: Course[];
}

export default function SearchAndTable({ data }: SearchAndTableProps) {
  const [searchValue, setSearchValue] = useState("");
  const [alertDialogMessage, setAlertDialogMessage] = useState("");
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const createAlert = (message: string) => {
    setAlertDialogMessage(message);
    setAlertDialogOpen(true);
  };
  const closeAlert = () => {
    setAlertDialogOpen(false);
  };
  let searchResults: Course[] = data.filter((course) =>
    course.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  return (
    <>
      <AlertDialog
        message={alertDialogMessage}
        open={alertDialogOpen}
        handleClose={closeAlert}
      />
      <Box sx={{ justifyContent: "center", pt: "50px" }}>
        <SearchBar setSearchValue={setSearchValue} />
        <CourseTable data={searchResults} handleAlert={createAlert} />
      </Box>
    </>
  );
}
