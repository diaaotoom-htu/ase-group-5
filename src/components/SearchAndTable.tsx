import { Box } from "@mui/material";
import SearchBar from "./SearchBar";
import CourseTable from "./CourseTable";
import { useState } from "react";

interface Course {
  registrationId: number;
  id: number;
  name: string;
  timeslot: string;
}

interface SearchAndTableProps {
  data: Course[];
  createAlert: (title: string, message: string) => void;
}

export default function SearchAndTable({
  data,
  createAlert,
}: SearchAndTableProps) {
  const [searchValue, setSearchValue] = useState("");

  let searchResults: Course[] = data.filter((course) =>
    course.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  return (
    <>
      <Box sx={{ justifyContent: "center", pt: "50px" }}>
        <SearchBar setSearchValue={setSearchValue} />
        <CourseTable data={searchResults} handleAlert={createAlert} />
      </Box>
    </>
  );
}
