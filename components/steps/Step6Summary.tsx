import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
  Alert,
  FormControlLabel,
  Checkbox,
  IconButton,
  ListItemSecondaryAction,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import EditIcon from "@mui/icons-material/Edit";
import { AppProps, StepId } from "../../types";
import { INITIATIVES, STEPS } from "../../constants";
import { saveConversation } from "../../services/conversationService";

interface SummaryItemProps {
  label: string;
  value: React.ReactNode;
  onEdit?: () => void;
  editable?: boolean;
}

const SummaryItem: React.FC<SummaryItemProps> = ({
  label,
  value,
  onEdit,
  editable = false,
}) => {
  const displayValue = value || (
    <Typography component="span" fontStyle="italic" color="text.secondary">
      Not provided
    </Typography>
  );

  return (
    <ListItem divider>
      <ListItemText
        primary={label}
        secondary={displayValue}
        primaryTypographyProps={{ fontWeight: "bold" }}
        secondaryTypographyProps={{
          component: "div",
          color: "text.primary",
          mt: 0.5,
        }}
      />
      {editable && (
        <ListItemSecondaryAction>
          <IconButton edge="end" onClick={onEdit}>
            <EditIcon />
          </IconButton>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

const Step6Summary: React.FC<AppProps> = ({
  data,
  onNext,
  onBack,
  updateData,
  navigateToStep,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [sendCopy, setSendCopy] = useState(false);

  const handleEdit = (stepId: StepId) => {
    if (navigateToStep) {
      navigateToStep(stepId);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");
    try {
      const payload = { ...data, sendCopy, status: "completed" };
      console.log("Payload: ", payload);
      const result = await saveConversation(payload);
      console.log("Conversation saved:", result);

      if (sendCopy) {
        console.log("User requested a copy. Triggering email service...");
      }

      onNext();
    } catch (e) {
      setError("Failed to submit conversation. Please try again.");
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderTopicDetails = () => {
    const mainTopicEntries = Object.entries(data.topicDetails).filter(
      ([, details]) =>
        Object.keys(details).length > 0 &&
        ((details as any).customNote ||
          Object.values(details).some(
            (d: any) => d.selectedOptions?.length > 0 || d.customNote
          ))
    );
    if (mainTopicEntries.length === 0) return null;

    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {mainTopicEntries.map(([topicId, subGroups]) => {
          const details = subGroups as any;
          return (
            <Box key={topicId}>
              <Typography variant="subtitle1" fontWeight="bold">
                {topicId}
              </Typography>
              {details.customNote && (
                <Typography variant="body2">{details.customNote}</Typography>
              )}
              {Object.entries(details)
                .filter(([key]) => key !== "customNote")
                .map(([subGroupId, subGroupDetails]: [string, any]) => (
                  <Box key={subGroupId} sx={{ ml: 2, mt: 1 }}>
                    <Typography variant="subtitle2">{subGroupId}</Typography>
                    {subGroupDetails.selectedOptions?.length > 0 && (
                      <Typography variant="body2">
                        Selected: {subGroupDetails.selectedOptions.join(", ")}
                      </Typography>
                    )}
                    {subGroupDetails.customNote && (
                      <Typography variant="body2" color="text.secondary">
                        Note: {subGroupDetails.customNote}
                      </Typography>
                    )}
                  </Box>
                ))}
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Summary & Submission
      </Typography>
      <Paper variant="outlined">
        <List dense>
          <SummaryItem
            label="District"
            value={data.districts.join(", ")}
            editable
            onEdit={() => handleEdit(StepId.District)}
          />
          <SummaryItem
            label="Topic Details"
            value={renderTopicDetails()}
            editable
            onEdit={() => handleEdit(StepId.Topics)}
          />
          <SummaryItem
            label="Selected Initiatives"
            value={data.selectedInitiatives
              .map((id) => INITIATIVES.find((i) => i.id === id)?.name)
              .join(", ")}
            editable
            onEdit={() => handleEdit(StepId.Initiatives)}
          />
          <SummaryItem
            label="Anonymous"
            value={data.isAnonymous ? "Yes" : "No"}
            editable
            onEdit={() => handleEdit(StepId.Consent)}
          />
          <SummaryItem
            label="Contact Shared"
            value={data.shareContact ? `Yes (${data.contactInfo})` : "No"}
            editable
            onEdit={() => handleEdit(StepId.Consent)}
          />
          <SummaryItem
            label="Observer Reflection"
            value={data.observerReflection}
            editable
            onEdit={() => handleEdit(StepId.Reflection)}
          />
          <SummaryItem
            label="Surprise"
            value={data.surprise}
            editable
            onEdit={() => handleEdit(StepId.Reflection)}
          />
          <SummaryItem
            label="Metrics"
            value={`${data.numPeople} people, ${data.duration} minutes`}
            editable
            onEdit={() => handleEdit(StepId.Metrics)}
          />
          <SummaryItem
            label="Standort"
            value={data.location || "Not provided"}
          />
        </List>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {data.shareContact && data.contactInfo && (
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-start" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={sendCopy}
                onChange={(e) => setSendCopy(e.target.checked)}
                name="sendCopy"
                color="primary"
              />
            }
            label={`Send a copy of this summary to ${data.contactInfo}`}
          />
        </Box>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button variant="text" onClick={onBack}>
          Back
        </Button>
        <LoadingButton
          variant="contained"
          onClick={handleSubmit}
          loading={isSubmitting}
        >
          Submit Conversation
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default Step6Summary;
