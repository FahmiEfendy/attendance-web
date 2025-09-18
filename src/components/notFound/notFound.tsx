import { Box, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        widht: "100%",
        height: "10rem",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">Data not found!</Typography>
    </Box>
  );
};

export default NotFound;
