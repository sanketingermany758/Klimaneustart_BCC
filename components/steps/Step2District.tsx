import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { AppProps } from "../../types";
import { BERLIN_DISTRICTS } from "../../constants";
import { getString } from "../../stringutils";

const Step2District: React.FC<AppProps> = ({
  data,
  updateData,
  onNext,
  onBack,
}) => {
  const handleDistrictSelect = (districtName: string) => {
    // Single district selection
    updateData({ districts: [districtName] });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", gap: 3 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 4 },
          bgcolor: "info.main",
          color: "info.contrastText",
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {getString("dialogue.headerTitle")}
        </Typography>
        <Typography variant="h6">
          {getString("dialogue.headerSubtitle")}
        </Typography>
      </Paper>

      <Grid container spacing={2}>
        {BERLIN_DISTRICTS.map((district) => (
          <Grid xs={6} sm={4} md={3} key={district}>
            <Button
              fullWidth
              variant={data.districts[0] === district ? "contained" : "outlined"}
              onClick={() => handleDistrictSelect(district)}
              sx={{ height: "100%" }}
            >
              {district}
            </Button>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "space-between", pt: 2 }}>
        <Button variant="text" onClick={onBack}>
          Back
        </Button>
        <Button
          variant="contained"
          onClick={onNext}
          endIcon={<ArrowForwardIcon />}
        >
          {data.districts.length === 0 ? "Skip" : "Weiter"}
        </Button>
      </Box>
    </Box>
  );
};

export default Step2District;
