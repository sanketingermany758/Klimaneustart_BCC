import React from "react";
import { Box, Typography, TextField, Button, Paper, Chip } from "@mui/material";
import { AppProps } from "../../types";
import MicIcon from "@mui/icons-material/Mic";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styled from "styled-components";
import { COLORS } from "../../constants";

const StyledButton = styled(Button)`
  background-color: ${COLORS.primary_background};
  color: ${COLORS.heading};
  &:hover {
    background-color: ${COLORS.button_background_yellow};
  }
`;

const Step5Reflection: React.FC<AppProps> = ({
  data,
  updateData,
  onNext,
  onBack,
}) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", height: "100%", gap: 3 }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          bgcolor: COLORS.blue1,
          color: COLORS.white2,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" component="h1">
          Deine Reflexion
        </Typography>
        <Typography variant="h6">
          Was hat dir der Dialog noch gezeigt ..
        </Typography>
      </Paper>

      <Box sx={{ flexGrow: 1 }}>
        <Typography
          variant="body1"
          component="p"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Teile deine Gedanken zu diesem Gespräch – was hat dich überrascht oder
          was möchtest du dir merken?
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={8}
          variant="outlined"
          placeholder="Resonanz, Essenz, Takeaway..."
          value={data.observerReflection}
          onChange={(e) => updateData({ observerReflection: e.target.value })}
          sx={{
            backgroundColor: "background.paper",
            mt: 1,
            mb: 3,
          }}
        />

        <Paper
          variant="outlined"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              color: "text.secondary",
            }}
          >
            <MicIcon />
            <Typography fontWeight="500">
              ... oder mach eine Audioaufnahme
            </Typography>
          </Box>
          <Chip label="Soon" variant="outlined" />
        </Paper>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 2, fontStyle: "italic" }}
        >
          mit größeren Zusammenhängen zu verknüpfen
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pt: 2,
          mt: "auto",
        }}
      >
        <StyledButton variant="text" onClick={onBack}>
          Zurück
        </StyledButton>
        <StyledButton
          variant="contained"
          onClick={onNext}
          endIcon={<ArrowForwardIcon />}
        >
          Weiter
        </StyledButton>
      </Box>
    </Box>
  );
};

export default Step5Reflection;
