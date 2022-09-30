import { CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ligthTheme, darkTheme } from "./themes";
import AuthContext from "./context/Auth";
import Navigator from "./routes/Navigator";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={ligthTheme}>
        <CssBaseline />
        <AuthContext>
          <Navigator />
        </AuthContext>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
