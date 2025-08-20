import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { AppProps } from "../../types";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { COLORS } from "../../constants";
import styled from "styled-components";
import { useLanguage } from "../LanguageContext";

type ParticipantType = "single" | "family" | "couple";

const StyledButton = styled(Button)`
  background-color: ${COLORS.primary_background};
  color: ${COLORS.heading};
  &:hover {
    background-color: ${COLORS.button_background_yellow};
  }
`;

const Step5Metrics: React.FC<AppProps> = ({
  data,
  updateData,
  onNext,
  onBack,
}) => {
  const { t } = useLanguage();
  const handleParticipantTypeChange = (type: ParticipantType) => {
    // Enforce single selection like a radio group
    updateData({ participantType: type });
  };

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
          {t("metrics.dialogue")}
        </Typography>
        <Typography variant="h6">{t("metrics.generalInformation")} Infos</Typography>
      </Paper>

      <Grid container spacing={2}>
        <Grid xs={6}>
          <Typography variant="body2" align="center" sx={{ mb: 1 }}>
            {t("metrics.dialoguePartners")}
          </Typography>
          <TextField
            fullWidth
            type="number"
            value={data.numPeople}
            onChange={(e) =>
              updateData({ numPeople: parseInt(e.target.value, 10) || 0 })
            }
            inputProps={{
              style: {
                textAlign: "center",
                fontSize: "1.5rem",
                fontWeight: "bold",
              },
              min: 1,
            }}
            variant="filled"
            sx={{
              "& .MuiOutlinedInput-root": {
                height: "100px",
                alignItems: "center",
                justifyContent: "center",
              },
              
          "& .MuiFilledInput-root": {
            backgroundColor: COLORS.white2,
            "&:hover": {
              backgroundColor: COLORS.white3,
            },
            "&.Mui-focused": {
              backgroundColor: COLORS.white2,
              borderColor: COLORS.brown2,
              boxShadow: `0 0 0 2px ${COLORS.brown2}`,
            },
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: COLORS.brown2,
          },
        }}
            
          />
        </Grid>
        <Grid xs={6}>
          <Typography variant="body2" align="center" sx={{ mb: 1 }}>
            {t("metrics.duration")}
          </Typography>
          <TextField
            fullWidth
            type="number"
            value={data.duration}
            onChange={(e) =>
              updateData({ duration: parseInt(e.target.value, 10) || 0 })
            }
            inputProps={{
              style: {
                textAlign: "center",
                fontSize: "1.5rem",
                fontWeight: "bold",
              },
              min: 1,
            }}
            variant="filled"
            sx={{
              "& .MuiOutlinedInput-root": {
                height: "100px",
                alignItems: "center",
                justifyContent: "center",
              },
              
          "& .MuiFilledInput-root": {
            backgroundColor: COLORS.white2,
            "&:hover": {
              backgroundColor: COLORS.white3,
            },
            "&.Mui-focused": {
              backgroundColor: COLORS.white2,
              borderColor: COLORS.brown2,
              boxShadow: `0 0 0 2px ${COLORS.brown2}`,
            },
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: COLORS.brown2,
          },
        }}
          
          />
        </Grid>
      </Grid>

      <Paper variant="outlined" sx={{ p: 1, borderRadius: 2 }}>
        <FormGroup row sx={{ justifyContent: "space-around" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={data.participantType === "single"}
                onChange={() => handleParticipantTypeChange("single")}
              />
            }
            label={t("metrics.single")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={data.participantType === "family"}
                onChange={() => handleParticipantTypeChange("family")}
              />
            }
            label={t("metrics.family")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={data.participantType === "couple"}
                onChange={() => handleParticipantTypeChange("couple")}
              />
            }
            label={t("metrics.couple")}
          />
        </FormGroup>
      </Paper>

      <TextField
        fullWidth
        label={t("metrics.location") + " " + t("common.soon")}
        value={data.location || ""}
        onChange={(e) => updateData({ location: e.target.value })}
        variant="filled"
        disabled
        sx={{
          "& .MuiFilledInput-root": {
            backgroundColor: COLORS.white2,
            "&:hover": {
              backgroundColor: COLORS.white3,
            },
            "&.Mui-focused": {
              backgroundColor: COLORS.white2,
              borderColor: COLORS.brown2,
              boxShadow: `0 0 0 2px ${COLORS.brown2}`,
            },
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: COLORS.brown2,
          },
        }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pt: 2,
          mt: "auto",
        }}
      >
        <StyledButton variant="text" onClick={onBack}>
          {t("dialogue.back")}
        </StyledButton>
        <StyledButton
          variant="contained"
          onClick={onNext}
          endIcon={<ArrowForwardIcon />}
        >
          {t("dialogue.next")}
        </StyledButton>
      </Box>
    </Box>
  );
};

export default Step5Metrics;
