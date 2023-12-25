import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { UserToken } from "./UseToken";

interface LoginBoxProps {
  setToken: (userToken: UserToken) => void;
}

export default function LoginBox({ setToken }: LoginBoxProps) {
  const navigate = useNavigate();
  // Hook for when the user clicks "Login"
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const studentNumber = data.get("studentNumber")?.toString();
    const password = data.get("password")?.toString();
    let check: boolean = true;
    if (studentNumber!.length < 8) {
      setStudentNumberErrorMessage(
        "Your student number must be at least 8 digits"
      );
      setIsStudentNumberError(true);
      check = false;
    }
    if (password!.length < 8) {
      setPasswordErrorMessage("Passowrds must be 8 characters.");
      setIsPasswordError(true);
      check = false;
    }
    if (check) {
      const userToken = { token: studentNumber! };
      setToken(userToken);
      navigate("/registration");
    }
  };

  const [studentNumberInput, setStudentNumberInput] = React.useState("");
  const [studentNumberErrorMessage, setStudentNumberErrorMessage] =
    React.useState("");
  const [isStudentNumberError, setIsStudentNumberError] = React.useState(false);

  React.useEffect(() => {
    if (!/^\d*$/.test(studentNumberInput)) {
      setStudentNumberErrorMessage(
        "Your student number must consist of only digits"
      );
      setIsStudentNumberError(true);
    } else if (/^\d*$/.test(studentNumberInput)) {
      setStudentNumberErrorMessage("");
      setIsStudentNumberError(false);
    }
  }, [studentNumberInput]);

  const [passwordInput, setPasswordInput] = React.useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [isPasswordError, setIsPasswordError] = React.useState(false);

  React.useEffect(() => {
    setPasswordErrorMessage("");
    setIsPasswordError(false);
  }, [passwordInput]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: 1,
          borderColor: "#FFFFFF",
          borderRadius: "5%",
          p: 5,
          bgcolor: "white",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <AccountBoxOutlinedIcon sx={{ color: "#FFFFFF" }} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Dummy Registration System
        </Typography>
        <Typography component="h1" variant="h5">
          Student Portal
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            error={isStudentNumberError}
            helperText={studentNumberErrorMessage}
            onChange={(e) => setStudentNumberInput(e.target.value)}
            value={studentNumberInput}
            margin="normal"
            required
            fullWidth
            label="Student Number"
            id="studentNumber"
            name="studentNumber"
            autoComplete="studentNumber"
            autoFocus
          />
          <TextField
            error={isPasswordError}
            helperText={passwordErrorMessage}
            onChange={(e) => setPasswordInput(e.target.value)}
            value={passwordInput}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
