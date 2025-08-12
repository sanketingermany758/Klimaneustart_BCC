import React from "react";
import { Box, Typography, TextField, Button, Paper, Chip } from "@mui/material";
import { AppProps } from "../../types";
import { getString } from "../../stringutils";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Step1Core: React.FC<AppProps> = ({ data, updateData, onNext }) => {
  const MAX_CHARS = 2000;

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
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          {getString("dialogue.headerTitle")}
        </Typography>
        <Typography variant="h6" align="center">
          {getString("dialogue.headerSubtitle")}
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
          placeholder={getString("dialogue.notesPlaceholder")}
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

        <Paper
          elevation={0}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            mt: 3,
            bgcolor: "#eeeeee",
            borderRadius: 2,
          }}
        >
          <Typography color="text.secondary" fontWeight="500">
            {getString("dialogue.recordAudio")}
          </Typography>
          <Chip label={getString("dialogue.soon")} disabled />
        </Paper>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 2 }}>
        <Button
          variant="contained"
          onClick={onNext}
          endIcon={<ArrowForwardIcon />}
        >
          weiter ...
        </Button>
      </Box>
    </Box>
  );
};

export default Step1Core;
