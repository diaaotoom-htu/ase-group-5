import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import LoginBox from "../components/LoginBox";
import UseToken from "../components/UseToken";
import { Navigate } from "react-router-dom";
import backgroundImg from '../assets/background.png';

export default function Login() {
  const themeDark = createTheme({
    palette: {
      background: {
        default: "#2A2D34",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            height: "100%",
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          },
        },
      },
    },
  });

  const { token, setToken } = UseToken();
  if (token) {
    return <Navigate to="/registration" replace={true} />;
  }
  return (
    <ThemeProvider theme={themeDark}>
      <CssBaseline />
      <LoginBox setToken={setToken} />
    </ThemeProvider>
  );
}
