import { Box } from "@mui/material";
import PrimaryRegistrationPageBar from "../components/PrimaryRegistrationPageBar";
import RequestsForm from "../components/RequestsForm";
import SearchAndTable from "../components/SearchAndTable";
import AlertDialog from "../components/AlertDialog";
import { useState, useEffect } from "react";
import backgroundImg from "../assets/background.png";

function createData(
  registrationId: number,
  id: number,
  name: string,
  timeslot: string
) {
  return { registrationId, id, name, timeslot };
}

const data = [
  createData(
    1,
    30201260,
    "Application Development",
    "Sunday-Wednesday 8:30-10:30"
  ),
  createData(
    2,
    30201461,
    "Mobile Application Development",
    "Monday-Thursday 10:30-12:30"
  ),
  createData(
    3,
    30202190,
    "Managing a Successful Computing Project",
    "Monday-Thursday 12:30-2:30"
  ),
  createData(4, 30201101, "Programming", "Monday-Thursday 2:30-4:30"),
  createData(5, 30201101, "Programming", "Sunday-Wednesday 2:30-4:30"),
  createData(6, 30201140, "Security", "Tuesday-Thursday 12:30-2:30"),
  createData(
    7,
    30201102,
    "Website Design & Development",
    "Sunday-Wednesday 8:30-10:30"
  ),
  createData(
    8,
    40201220,
    "Software Development Lifecycles",
    "Sunday-Wednesday 10:30-12:30"
  ),
  createData(
    9,
    30202200,
    "Data Structures & Algorithms",
    "Monday-Thursday 12:30-2:30"
  ),
  createData(
    10,
    30201421,
    "Advanced Software Engineering",
    "Sunday-Wednesday 2:30-4:30"
  ),
  createData(11, 40201341, "Operating Systems", "Saturday-Tuesday 10:30-12:30"),
  createData(12, 30201210, "Network Security", "Sunday-Wednesday 12:30-2:30"),
].sort((a, b) => (a.name < b.timeslot ? -1 : 1));

export default function Registration() {
  const [alertDialogTitle, setAlertDialogTitle] = useState("");
  const [alertDialogMessage, setAlertDialogMessage] = useState("");
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const handleAlertCreation = (title: string, message: string) => {
    setAlertDialogTitle(title);
    setAlertDialogMessage(message);
    setAlertDialogOpen(true);
  };
  const closeAlert = () => {
    setAlertDialogOpen(false);
  };

  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundImg})`;
    return () => {
      document.body.style.backgroundImage = '';
    };
  }, []);


  return (
    <>
      <AlertDialog
        title={alertDialogTitle}
        message={alertDialogMessage}
        open={alertDialogOpen}
        handleClose={closeAlert}
      />
      <PrimaryRegistrationPageBar />
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        <SearchAndTable data={data} createAlert={handleAlertCreation} />
        <RequestsForm createAlert={handleAlertCreation} />
      </Box>
    </>
  );
}
