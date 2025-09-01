import React from "react";
import { Box, Typography, TextField, Button, Paper, Chip } from "@mui/material";
import { AppProps } from "../../types";
import { useLanguage } from "../LanguageContext";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styled from "styled-components";
import { COLORS } from "../../constants";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 24px;
`;

const StyledPaper = styled(Paper)`
  padding: 16px;
  background-color: ${COLORS.new_red};
  color: ${COLORS.white2};
  border: 2px solid ${COLORS.green6};
  text-align: center;
`;

// const NotesField = styled(TextField)`
//   & .MuiOutlinedInput-root {
//     background-color: ${COLORS.white2};
//   }
// `;

const AudioPaper = styled(Paper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  margin-top: 24px;
  background-color: ${COLORS.white3};
  border-radius: 8px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 16px;
`;

const StyledButton = styled(Button)`
  background-color: ${COLORS.primary_green};
  color: ${COLORS.white2};
  &:hover {
    background-color: ${COLORS.green6};
  }
`;

const Step1Core: React.FC<AppProps> = ({ data, updateData, onNext }) => {
  const MAX_CHARS = 2000;
  const { t } = useLanguage();

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", height: "100%", gap: 3 }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 4 },
          bgcolor: "info.main",
          color: "info.contrastText",
          border: "2px solid #93c47D",
        }}
      >


        <Typography variant="h4" component="h1" gutterBottom>
          {t("dialogue.headerTitle")}
        </Typography>
        <Typography variant="h6">
          {t("dialogue.headerSubtitle")}
        </Typography>
      </Paper>

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          Notizen
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={8}
          variant="outlined"
          placeholder={t("dialogue.notesPlaceholder")}
          value={data.notes}
          onChange={(e) => updateData({ notes: e.target.value })}
          inputProps={{ maxLength: MAX_CHARS }}
          helperText={`${data.notes.length}/${MAX_CHARS} max`}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "background.paper",
            },
          }}

        />

        <AudioPaper elevation={0}>
          <Typography color="text.secondary" fontWeight="500">
            {t("dialogue.recordAudio")}
          </Typography>
          <Chip label={t("common.soon")} disabled />
        </AudioPaper>
      </Box>

      <Footer>
        <StyledButton
          variant="contained"
          onClick={onNext}
          endIcon={<ArrowForwardIcon />}
        >
          weiter ...
        </StyledButton>
      </Footer>
    </Box>
  );
};

export default Step1Core;
