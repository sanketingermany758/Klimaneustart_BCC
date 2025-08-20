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

const StyledButton = styled(Button)`
  background-color: ${COLORS.white2};
  color: ${COLORS.blue1};
  &:hover {
    background-color: ${COLORS.button_background_yellow};
    color: ${COLORS.brown2};
    opacity: 0.9;
  },
     &:focus {
    background-color: ${COLORS.button_background_yellow};
    color: ${COLORS.brown2};
    opacity: 0.9;
  }
`;

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
    <Container>
      <StyledPaper elevation={0}>
        <Typography variant="h4" component="h1" gutterBottom>
          {getString("dialogue.headerTitle")}
        </Typography>
        <Typography variant="h6">
          {getString("dialogue.headerSubtitle")}
        </Typography>
      </StyledPaper>

      <Grid container spacing={2}>
        {BERLIN_DISTRICTS.map((district) => (
          <Grid xs={6} sm={4} md={3} key={district}>
            <StyledButton
              fullWidth
              variant={data.districts[0] === district ? "contained" : "outlined"}
              onClick={() => handleDistrictSelect(district)}
              sx={{ height: "100%" }}

            >
              {district}
            </StyledButton>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "space-between", pt: 2 }}>
        <Button variant="text" onClick={onBack}>
          Back
        </Button>
        <StyledButton
          variant="contained"
          onClick={onNext}
          endIcon={<ArrowForwardIcon />}
        >
          {data.districts.length === 0 ? "Skip" : "Weiter"}
        </StyledButton>
      </Box>
    </Container>
  );
};

export default Step2District;
