import { Box, CircularProgress } from "@mui/material";

const CustomLoading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default CustomLoading;
