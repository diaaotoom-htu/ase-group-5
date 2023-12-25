import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import LoginBox from "../components/LoginBox";
import UseToken from "../components/UseToken";

export default function Login() {
  const themeDark = createTheme({
    palette: {
      background: {
        default: "#2A2D34",
      },
    },
  });

  const { setToken } = UseToken();

  return (
    <ThemeProvider theme={themeDark}>
      <CssBaseline />
      <LoginBox setToken={setToken} />;
    </ThemeProvider>
  );
}
