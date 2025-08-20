import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardActionArea,
  Modal,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { QRCodeCanvas } from "qrcode.react";
import { AppProps } from "../../types";
import { INTEREST_AREAS2, INITIATIVES, COLORS } from "../../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { saveConversation } from "../../services/conversationService";
import { useLanguage } from "../LanguageContext";
import styled from "styled-components";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

// Frontend route base for the public QR page
const PUBLIC_QR_BASE =
  typeof window !== "undefined" ? window.location.origin : "";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 24px;
`;

const StyledPaper = styled(Paper)`
  padding: 16px;
  background-color: ${COLORS.primary_green};
  color: ${COLORS.white2};
  border: 2px solid ${COLORS.green6};
  text-align: center;
`;

const StyledButton = styled(Button)`
  background-color: ${COLORS.primary_background};
  color: ${COLORS.heading};
  &:hover {
    background-color: ${COLORS.button_background_yellow};
  }
`;

const Step3Initiatives: React.FC<AppProps> = ({
  data,
  updateData,
  onNext,
  onBack,
}) => {
  const [qrCodeValue, setQrCodeValue] = useState<string | null>(null);
  const [showInitiatives, setShowInitiatives] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const { t } = useLanguage();

  const handleLocalBack = () => {
    if (showInitiatives) setShowInitiatives(false);
    else onBack();
  };

  const handleInterestToggle = (interestId: string) => {
    const newInterests = data.interestAreas.includes(interestId)
      ? data.interestAreas.filter((i) => i !== interestId)
      : [...data.interestAreas, interestId];
    updateData({ interestAreas: newInterests });
  };

  const handleInitiativeToggle = (initiativeId: string) => {
    const newInitiatives = data.selectedInitiatives.includes(initiativeId)
      ? data.selectedInitiatives.filter((i) => i !== initiativeId)
      : [...data.selectedInitiatives, initiativeId];
    updateData({ selectedInitiatives: newInitiatives });
  };

  const handleSkip = () => {
    // Clear any selected interests/initiatives and move to next step
    updateData({
      interestAreas: [],
      selectedInitiatives: [],
    });
    onNext();
  };

  const filteredInitiatives = useMemo(() => {
    if (!showInitiatives) return [];
    return INITIATIVES.filter((initiative) => {
      const districtMatch =
        data.districts.length === 0 ||
        initiative.district.some((d) => data.districts.includes(d));
      const interestMatch =
        data.interestAreas.length === 0 ||
        initiative.themes.some((theme) => data.interestAreas.includes(theme));
      return districtMatch && interestMatch;
    });
  }, [data.districts, data.interestAreas, showInitiatives]);

  const renderInterestSelection = () => (
    <Box
      sx={{ display: "flex", flexDirection: "column", height: "100%", gap: 3 }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 4 },
          bgcolor: COLORS.blue1,
          color: COLORS.white2,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" component="h1">
          {t("initiatives.initiativeMatching")}
        </Typography>
        <Typography variant="h6">{t("initiatives.selectInterestAreas")}</Typography>
      </Paper>
      <Grid container spacing={2}>
        {INTEREST_AREAS2.map((interest) => {
          const Icon = interest.icon;
          const isSelected = data.interestAreas.includes(interest.id);
          return (
            <Grid xs={12} sm={6} md={4} key={interest.id}>
              <Card
                variant="outlined"
                sx={{
                  height: "100%",
                  borderColor: isSelected ? COLORS.button_background_yellow : COLORS.grey2,
                  borderWidth: 2,
                }}
              >
                <CardActionArea
                  onClick={() => handleInterestToggle(interest.id)}
                  sx={{ p: 2, textAlign: "center", height: "100%" }}
                >
                  <Icon
                    sx={{ fontSize: 40, mb: 1 }}
                    color={isSelected ? "primary" : "action"}
                  />
                  <Typography variant="h6">{interest.name}</Typography>
                  <Typography variant="body2" color={COLORS.heading}>
                    {interest.description}
                  </Typography>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
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
        <Box>
          <StyledButton variant="text" onClick={handleSkip} sx={{ mr: 2 }}>
            {t("dialogue.skip")}
          </StyledButton>
          <StyledButton
            variant="contained"
            onClick={() => setShowInitiatives(true)}
            disabled={data.interestAreas.length === 0}
            endIcon={<ArrowForwardIcon />}
          >
            {t("initiatives.findInitiatives")}
          </StyledButton>
        </Box>
      </Box>
    </Box>
  );

  const renderInitiativeList = () => (
    <Box>
      <StyledButton
        onClick={handleLocalBack}
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 2 }}
      >
        {t("initiatives.changeInterests")}
      </StyledButton>
      <Typography variant="h4" gutterBottom>
        {t("initiatives.relevantInitiatives")}
        {data.districts.length > 0 && ` ${t("initiatives.in")} ${data.districts.join(", ")}`}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
        {filteredInitiatives.length > 0 ? (
          filteredInitiatives.map((initiative) => {
            const isSelected = data.selectedInitiatives.includes(initiative.id);
            return (
              <Card
                key={initiative.id}
                variant="outlined"
                sx={{
                  borderColor: isSelected ? COLORS.blue2 : COLORS.grey2,
                  borderWidth: 3,
                  borderRadius: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "stretch",
                    justifyContent: "space-between",
                  }}
                >
                  <CardActionArea
                    onClick={() => handleInitiativeToggle(initiative.id)}
                    sx={{ flexGrow: 1, p: 2 }}
                  >
                    <Typography variant="h6" component="div">
                      {initiative.name}
                    </Typography>
                    <Typography variant="body2" color={COLORS.heading}>
                      {initiative.description}
                    </Typography>
                  </CardActionArea>

                  <Box
                    sx={{ display: "flex", alignItems: "center", p: 1, pr: 2 }}
                  >
                    <Button
                      variant="outlined"
                      onClick={(e) => {
                        e.stopPropagation();
                        setQrCodeValue(`${initiative.link}`);
                      }}
                      sx={{
                        width: 80,
                        height: 80,
                        flexShrink: 0,
                      }}
                    >
                      {t("initiatives.qrCode")}
                    </Button>
                  </Box>
                </Box>
              </Card>
            );
          })
        ) : (
          <Typography color={COLORS.heading} fontStyle="italic">
            {t("initiatives.noInitiativesMatch")}
          </Typography>
        )}

        <Card
          variant="outlined"
          sx={{
            mt: 4,
            textAlign: "center",
          }}
        >
          <CardActionArea
            onClick={async () => {
              try {
                setIsSavingDraft(true);
                await saveConversation({
                  uuid: data.uuid,
                  status: "in_progress" as any,
                  selectedInitiatives: data.selectedInitiatives,
                  interestAreas: data.interestAreas,
                  districts: data.districts,
                  isAnonymous: data.isAnonymous,
                  shareContact: false,
                } as any);
              } catch (e) {
                // Non-blocking: still show QR to avoid UX dead-end
                console.error("Failed to save draft before showing QR", e);
              } finally {
                setIsSavingDraft(false);
                setQrCodeValue(`${PUBLIC_QR_BASE}/dialogue/${data.uuid}`);
              }
            }}
            sx={{ p: 2 }}
          >
            <Typography variant="h6">
              {isSavingDraft ? t("initiatives.preparingQR") : t("initiatives.showQR")}
            </Typography>
          </CardActionArea>
        </Card>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", pt: 2 }}>
        <StyledButton variant="text" onClick={handleLocalBack}>
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

  return (
    <Container>
      {!showInitiatives ? renderInterestSelection() : renderInitiativeList()}
      <Modal open={!!qrCodeValue} onClose={() => setQrCodeValue(null)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" gutterBottom>
            {t("initiatives.scanForMoreInfo")}
          </Typography>
          {qrCodeValue && (
            <QRCodeCanvas
              value={qrCodeValue}
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            />
          )}
          <Button onClick={() => setQrCodeValue(null)} sx={{ mt: 2 }}>
            {t("initiatives.close")}
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default Step3Initiatives;
