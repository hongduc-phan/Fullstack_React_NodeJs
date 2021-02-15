import { Box, Container, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CharacterCount } from "components/reusable";
import { UseFormState } from "hooks/useForm";
import React from "react";
import { CreateSparkSparkOnFormState } from "types";
import { IVestResult } from "vest";

export type SparkFormPlainProps = {
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formState: UseFormState<CreateSparkSparkOnFormState>;
  validationResult: Pick<IVestResult, "hasErrors" | "getErrors">;
  isImageRendered?: boolean;
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0
  },
  formContainer: {
    margin: "0 auto",
    marginTop: theme.spacing(3),
    padding: theme.spacing(0, 2)
  },
  formInputWrapper: {
    paddingBottom: theme.spacing(2)
  },
  titleWrapper: {
    paddingBottom: theme.spacing(2)
  },
  title: {
    color: "black",
    fontSize: "1.5rem",
    lineHeight: 1.16,
    paddingBottom: theme.spacing(1)
  },
  mainPointText: {
    fontSize: "0.875rem",
    fontWeight: 600,
    lineHeight: 1.7
  },
  elaborationText: {
    fontSize: "1.125rem",
    lineHeight: 1.56,
    letterSpacing: "0.5px",
    paddingBottom: theme.spacing(0.75)
  }
}));

const SparkFormPlain = ({
  isImageRendered = false,
  onBlur,
  onFocus,
  onChange,
  formState,
  validationResult
}: SparkFormPlainProps) => {
  const classes = useStyles();

  const {
    values: { title, main, elaboration },
    focused,
    touched
  } = formState;

  const { getErrors, hasErrors } = validationResult;

  return (
    <Container className={classes.root}>
      <form className={classes.formContainer}>
        <Box className={classes.formInputWrapper}>
          <InputBase
            name="title"
            placeholder="Title your Spark"
            fullWidth
            inputProps={{ "aria-label": "title-text", maxLength: 75 }}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            value={title}
            className={classes.title}
          />
          {touched.title && (focused.title || hasErrors("title")) && (
            <CharacterCount characterCount={title.length ?? 0} error={getErrors("title")} maxCharacterCount={50} />
          )}
        </Box>
        <Box className={classes.formInputWrapper}>
          <InputBase
            name="main"
            placeholder="Your perspective (an observation, an idea, a thought, the main point...)"
            fullWidth
            inputProps={{ "aria-label": "main-text", maxLength: 320 }}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            value={main}
            className={classes.mainPointText}
          />
          {touched.main && (focused.main || hasErrors("main")) && (
            <CharacterCount characterCount={main.length ?? 0} error={getErrors("main")} maxCharacterCount={300} />
          )}
        </Box>
        <Box className={classes.formInputWrapper}>
          <InputBase
            name="elaboration"
            placeholder="If you wish you can elaborate on your perspective"
            multiline
            fullWidth
            rowsMax={isImageRendered ? 13 : 25}
            inputProps={{ "aria-label": "elaboration-text", maxLength: 3050 }}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            value={elaboration}
            className={classes.elaborationText}
          />
          {touched.elaboration && (focused.elaboration || hasErrors("elaboration")) && (
            <CharacterCount
              characterCount={elaboration.length ?? 0}
              error={getErrors("elaboration")}
              maxCharacterCount={3000}
            />
          )}
        </Box>
      </form>
    </Container>
  );
};

export default SparkFormPlain;
