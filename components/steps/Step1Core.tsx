import React from "react";
import { Box, Typography, TextField, Button, Paper, Chip } from "@mui/material";
import { AppProps } from "../../types";
import { getString } from "../../stringutils";
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
  background-color: ${COLORS.blue1};
  color: ${COLORS.white2};
  border: 2px solid ${COLORS.green6};
  text-align: center;
`;

const NotesField = styled(TextField)`
  & .MuiOutlinedInput-root {
    background-color: ${COLORS.white2};
  }
`;

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

  return (
    <Container>
      <StyledPaper elevation={0}>
        <Typography variant="h4" component="h1" gutterBottom>
          {getString("dialogue.headerTitle")}
        </Typography>
        <Typography variant="h6">
          {getString("dialogue.headerSubtitle")}
        </Typography>
      </StyledPaper>

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          Notizen
        </Typography>
        <NotesField
          fullWidth
          multiline
          rows={8}
          variant="outlined"
          placeholder={getString("dialogue.notesPlaceholder")}
          value={data.notes}
          onChange={(e) => updateData({ notes: e.target.value })}
          inputProps={{ maxLength: MAX_CHARS }}
          helperText={`${data.notes.length}/${MAX_CHARS} max`}
        />

        <AudioPaper elevation={0}>
          <Typography color="text.secondary" fontWeight="500">
            {getString("dialogue.recordAudio")}
          </Typography>
          <Chip label={getString("dialogue.soon")} disabled />
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
    </Container>
  );
};

export default Step1Core;
