import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import React, { useState } from "react";
import { IgniteChip } from "./reusable";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  dialogContent: {
    paddingTop: 0,
    height: 540
  },
  chipsContainer: {
    maxWidth: 380,
    textAlign: "center",
    marginTop: 48
  },
  dialogActions: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 14
  },
  additionalInfoField: {
    ...theme.typography.subtitle1
  }
}));

type IgniteReportProps = {
  onCancel: () => void;
  onSubmit: (formData: SparkReportFormData) => void;
};

export type SparkReportFormData = {
  ignite: string;
  additionalText: string;
};

const IgniteReport = ({ onSubmit, onCancel }: IgniteReportProps) => {
  const classes = useStyles();
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [reportText, setReportText] = useState<string | undefined>(undefined);

  const handleReportTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReportText(event.target.value);
  };

  const handleSubmit = () => {
    const formData: SparkReportFormData = { ignite: selected!, additionalText: !!reportText ? reportText : "" };
    onSubmit(formData);
  };

  const open = true;
  const isIgniteChipSelected = Boolean(selected);

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      aria-label="select-from-hunome-gallery"
      disableBackdropClick
      classes={{
        root: classes.root
      }}
    >
      <DialogTitle>Report an issue with the Spark</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="caption" gutterBottom>
          Help us to build a better community
        </Typography>

        <Container className={classes.chipsContainer}>
          {reportIgniteItems.map(({ label, value }) => (
            <IgniteChip
              key={value}
              clickable
              chipLabel={label}
              isSelected={selected === value}
              onClick={() => setSelected(value)}
            />
          ))}

          <Box marginTop="48px">
            {isIgniteChipSelected && (
              <TextField
                id="filled-textarea"
                placeholder="Additional information"
                className={classes.additionalInfoField}
                InputProps={{
                  className: classes.additionalInfoField,
                  disableUnderline: true,
                  color: "primary"
                }}
                multiline
                variant="filled"
                rows={5}
                value={reportText}
                onChange={handleReportTextChange}
              />
            )}
          </Box>
        </Container>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button aria-label="cancel spark report" variant="outlined" onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Box />
        <Button
          disabled={!isIgniteChipSelected}
          aria-label="submit spark report"
          variant="contained"
          onClick={handleSubmit}
          color="primary"
        >
          Report Spark
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const reportIgniteItems = [
  { label: "Adult", value: "adult" },
  { label: "Illegal", value: "illegal" },
  { label: "Libellous", value: "libellous" },
  { label: "Plagiarism", value: "plagiarism" },
  { label: "Promotional", value: "promotional" },
  { label: "Spam", value: "spam" },
  { label: "Hate Speech", value: "hate speech" },
  { label: "Malicious", value: "malicious" },
  { label: "Offensive", value: "offensive" },
  { label: "Racist", value: "racist" },
  { label: "Violence", value: "insulting" }
];

export default React.memo(IgniteReport);
