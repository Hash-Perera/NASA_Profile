import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function CustomSnakbar({
  open,
  severity,
  duration,
  handleCloseSnakBar,
}) {
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleCloseSnakBar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnakBar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          This is a success Alert inside a Snackbar!
        </Alert>
      </Snackbar>
    </>
  );
}
