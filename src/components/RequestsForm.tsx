import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
// import UseRequests from "./UseRequests";

const days = ["Saturday-Tuesday", "Sunday-Wednesday", "Monday-Thursday"];
const times = ["8:30-10:30", "10:30-12:30", "12:30-2:30", "2:30-4:30"];

interface RequestsFormProps {
  createAlert: (title: string, message: string) => void;
}

export default function RequestsForm({ createAlert }: RequestsFormProps) {
  // Not used for now
  // const { requests, setRequests } = UseRequests();

  const [courseNameValue, setCourseNameValue] = useState("");
  const [dayValue, setDayValue] = useState("Saturday-Tuesday");
  const [timeValue, setTimeValue] = useState("8:30-10:30");
  const [isException, setIsException] = useState(false);

  const sendRequest = () => {
    if (courseNameValue === "") {
      createAlert("Invalid request", "Please fill out the course name.");
      return;
    }
    createAlert(
      "Request sent",
      'Your request for "' + courseNameValue + '" has been sent.'
    );
    setCourseNameValue("");
    setDayValue("Saturday-Tuesday");
    setTimeValue("8:30-10:30");
    setIsException(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        mt: "50px",
        ml: "25px",
        p: 5,
        height: "460px",
        border: 3,
        borderRadius: 2,
        borderColor: "primary.main",
      }}
    >
      <Typography align="left">
        <b>Request a course</b>
      </Typography>
      <TextField
        required
        id="outlined-required"
        label="Course Name"
        value={courseNameValue}
        onChange={(e) => setCourseNameValue(e.target.value)}
      />
      <TextField
        select
        label="Days"
        value={dayValue}
        onChange={(e) => setDayValue(e.target.value)}
      >
        {days.map((day) => (
          <MenuItem key={day} value={day}>
            {day}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Times"
        value={timeValue}
        onChange={(e) => setTimeValue(e.target.value)}
      >
        {times.map((time) => (
          <MenuItem key={time} value={time}>
            {time}
          </MenuItem>
        ))}
      </TextField>
      <FormControlLabel
        control={
          <Checkbox
            checked={isException}
            onChange={() => setIsException(!isException)}
          />
        }
        label="Flag as an exception."
      />
      <Button
        variant="contained"
        onClick={() => {
          sendRequest();
        }}
      >
        Send
      </Button>
    </Box>
  );
}
