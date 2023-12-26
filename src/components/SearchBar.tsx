import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  setSearchValue: (value: string) => void;
}

export default function SearchBar({ setSearchValue }: SearchBarProps) {
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        mb: "10px",
        display: "flex",
        alignItems: "center",
        width: "900px",
      }}
    >
      <SearchIcon sx={{ p: "10px" }} />
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Courses..."
        inputProps={{ "aria-label": "search courses" }}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </Paper>
  );
}
