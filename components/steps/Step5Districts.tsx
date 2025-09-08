import React from "react";
import { Box, Typography, Button, Paper, Grid } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { AppProps } from "../../types";
import { BERLIN_DISTRICTS } from "../../constants";
import { getString } from "../../stringutils";
import styled from "styled-components";
import { COLORS } from "../../constants";
import { useLanguage } from "../LanguageContext";

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
  border: 2px solid ${COLORS.chlorophyll};
  text-align: center;
`;

const StyledButton = styled(Button)`
  background-color: ${COLORS.white2};
  color: ${COLORS.black};
  &:hover {
    background-color: ${COLORS.chlorophyll};
    color: ${COLORS.blue1};
    opacity: 0.9;
  }
  ,
  &:focus {
    background-color: ${COLORS.chlorophyll};
    color: ${COLORS.blue1};
    opacity: 0.9;
  }
`;

const StyledNextButton = styled(Button)`
  background-color: ${COLORS.chlorophyll};
  color: ${COLORS.white2};
  &:hover {
    background-color: ${COLORS.chlorophyll};
    color: ${COLORS.white2};
    opacity: 0.7;
  }
  ,
  &:focus {
    background-color: ${COLORS.chlorophyll};
    color: ${COLORS.brown2};
    opacity: 0.7;
  }
`;

const StyledBackButton = styled(Button)`
  background-color: ${COLORS.feuerrot};
  color: ${COLORS.white2};
  &:hover {
    background-color: ${COLORS.feuerrot};
    color: ${COLORS.white2};
    opacity: 0.7;
  }
  ,
  &:focus {
    background-color: ${COLORS.feuerrot};
    color: ${COLORS.white2};
    opacity: 0.7;
  }
`;

const Step5District: React.FC<AppProps> = ({
  data,
  updateData,
  onNext,
  onBack,
}) => {
  const { t } = useLanguage();
  const handleLocalBack = () => {
    onBack();
  };

  const handleDistrictSelect = (districtName: string) => {
    const newDistricts = data.interestDistricts.includes(districtName)
      ? data.interestDistricts.filter((d) => d !== districtName)
      : [...data.interestDistricts, districtName];
    updateData({ interestDistricts: newDistricts });
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", height: "100%", gap: 3 }}
    >
      <StyledPaper elevation={0}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t("dialogue.headerTitle")}
        </Typography>
        <Typography variant="h6">{t("dialogue.headerSubtitle")}</Typography>
      </StyledPaper>
      <Grid container spacing={2}>
        {BERLIN_DISTRICTS.map((district) => (
          <Grid item xs={6} sm={4} md={3} key={district}>
            <StyledButton
              fullWidth
              variant={
                data.interestDistricts.includes(district)
                  ? "contained"
                  : "outlined"
              }
              onClick={() => handleDistrictSelect(district)}
              sx={{ height: "100%" }}
            >
              {district}
            </StyledButton>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 2 }}>
        <StyledNextButton
          variant="contained"
          onClick={() => onNext()}
          endIcon={<ArrowForwardIcon />}
        >
          {t("dialogue.next")}
        </StyledNextButton>
      </Box>
    </Box>
  );
};

export default Step5District;
