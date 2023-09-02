import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Router from "./router/Router";
import { ThemeProvider } from "@mui/material/styles";
import { themeOptions } from "./theme/mui-theme.config";

function App() {
  return (
    <>
      <ThemeProvider theme={themeOptions}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Router />
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
