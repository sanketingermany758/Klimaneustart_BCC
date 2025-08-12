import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { AppProps } from "../../types";

const ThankYou: React.FC<AppProps> = ({ onRestart, data }) => {
  console.log("Submitting Data: ", data);
  const initiativeCount = data.selectedInitiatives.length;
  console.log("initiativeCount", initiativeCount);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        py: { xs: 2, sm: 4 },
        height: "100%",
        gap: 3,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          bgcolor: "primary.main",
          color: "primary.contrastText",
          p: { xs: 3, sm: 4 },
          width: "100%",
          border: "1.5px solid #18181B", // Dark border as in sketch
          borderRadius: 2,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Vielen Dank!
        </Typography>
        <Typography variant="h6" component="p">
          Your response has been recorded and will contribute to community
          insights
        </Typography>
      </Paper>
      {/* This box is only shown if the user selected initiatives and is not anonymous */}
      {initiativeCount > 0 && !data.isAnonymous && (
        <Paper
          variant="outlined"
          sx={{
            p: 3,
            width: "100%",
            borderColor: "text.primary",
            borderWidth: 1.5,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
            {`You're interested in ${initiativeCount} ${
              initiativeCount === 1 ? "initiative" : "initiatives"
            }!`}
          </Typography>
          <Typography variant="body1">
            We will connect you with local opportunities soon!
          </Typography>
        </Paper>
      )}
      <Box sx={{ flexGrow: 1 }} /> {/* Spacer to push button to the bottom */}
      <Button
        onClick={onRestart}
        variant="contained"
        color="primary"
        size="large"
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", sm: 400 },
          border: "1.5px solid #18181B",
        }}
      >
        Nächster Dialog
      </Button>
    </Box>
  );
};

export default ThankYou;
