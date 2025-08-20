import React, { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  Paper,
  Button,
  Modal,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";
import { AppProps } from "../../types";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import { COLORS } from "../../constants";
import { useLanguage } from "../LanguageContext";
import styled from "styled-components";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 400 },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

const StyledButton = styled(Button)`
  background-color: ${COLORS.primary_background};
  color: ${COLORS.heading};
  &:hover {
    background-color: ${COLORS.button_background_yellow};
  }
`;

const Step4Consent: React.FC<AppProps> = ({
  data,
  updateData,
  onNext,
  onBack,
}) => {
  const [showQR, setShowQR] = useState(false);
  const [contactPreference, setContactPreference] = useState<
    "contact" | "anonymous"
  >(data.isAnonymous ? "anonymous" : "contact");
  const { t } = useLanguage();

  const handlePreferenceChange = (
    event: React.MouseEvent<HTMLElement>,
    newPreference: "contact" | "anonymous" | null
  ) => {
    if (newPreference !== null) {
      setContactPreference(newPreference);
      if (newPreference === "anonymous") {
        updateData({
          isAnonymous: true,
          shareContact: false,
          contactInfo: "",
          phone: "",
          firstName: "",
          lastName: "",
        });
      } else {
        updateData({
          isAnonymous: false,
          shareContact: true,
        });
      }
    }
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
          {t("consent.stayInTouch")}
        </Typography>
        <Typography variant="h6">
          {t("consent.stayUpToDate")}
        </Typography>
      </Paper>

      <ToggleButtonGroup
        color={contactPreference === "anonymous" ? "error" : "success"}
        value={contactPreference}
        exclusive
        onChange={handlePreferenceChange}
        aria-label="contact preference"
        fullWidth
      >
        <ToggleButton value="contact">{t("consent.shareContact")}</ToggleButton>
        <ToggleButton value="anonymous">{t("consent.stayAnonymous")}</ToggleButton>
      </ToggleButtonGroup>

      {contactPreference === "contact" && (
        <Paper variant="outlined" sx={{ p: 3, mt: 1 }}>
          <Typography variant="h6" gutterBottom>
            {t("consent.whichContactDetails")}
          </Typography>
          <Grid container spacing={2}>
            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label={t("consent.firstName")}
                value={data.firstName}
                onChange={(e) => updateData({ firstName: e.target.value })}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label={t("consent.lastName")}
                value={data.lastName}
                onChange={(e) => updateData({ lastName: e.target.value })}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                fullWidth
                label="E-mail"
                type="email"
                value={data.contactInfo}
                onChange={(e) => updateData({ contactInfo: e.target.value })}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                fullWidth
                label={t("consent.telephone")}
                type="tel"
                value={data.phone}
                onChange={(e) => updateData({ phone: e.target.value })}
              />
            </Grid>
          </Grid>
        </Paper>
      )}

      {contactPreference === "anonymous" && (
        <Alert severity="info" sx={{ mt: 1 }}>
          {t("consent.privacyProtected")}
        </Alert>
      )}

      <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
        <Button
          fullWidth
          startIcon={<QrCode2Icon />}
          onClick={() => setShowQR(true)}
        >
          {t("summary.ourQRCode")}
        </Button>
      </Paper>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        {t("consent.confidentialInfo")}
      </Typography>

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
        <StyledButton variant="contained" onClick={onNext}>
          {t("dialogue.next")}
        </StyledButton>
      </Box>

      <Modal open={showQR} onClose={() => setShowQR(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" gutterBottom>
            {t("consent.organizationQRCode")}
          </Typography>
          <QRCodeCanvas
            value={"https://klimaneustart.berlin/"}
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          />
          <Button onClick={() => setShowQR(false)} sx={{ mt: 2 }}>
            {t("initiatives.close")}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Step4Consent;
