import { Box, Button, Link, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LinkComponent from "components/LinkComponent";
import React from "react";

const TEXT_CONTENT_HEIGHT = "70vh";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "relative",
    height: "100%",
    width: "100%"
  },
  textContent: {
    height: TEXT_CONTENT_HEIGHT,
    overflowY: "auto",
    padding: theme.spacing(0, 3),
    fontSize: 14,
    letterSpacing: 0.25
  },
  headerText: {
    height: theme.spacing(5),
    marginBottom: theme.spacing(4),
    paddingLeft: theme.spacing(2.5)
  },
  nextBtn: {
    borderRadius: 9999
  },
  buttonContainer: {
    padding: theme.spacing(5, 0, 2, 0)
  }
}));

type Props = {
  disableActions?: boolean;
  onBackClick?: () => void;
  onNextClick?: () => void;
};

const CodeofConduct = ({ disableActions = false, onBackClick = () => {}, onNextClick = () => {} }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.headerText}>
        Community Code of Conduct
      </Typography>

      <div className={classes.textContent}>
        <Typography variant="body2">
          <p>Welcome to Hunome!</p>
          <p>
            Hunome allows members to connect their own perspectives with others to make sense of our humanness for a
            better world. We rely on each other to contribute and examine thoughts in a way that encourages interaction
            while also being respectful, all in a safe environment.
          </p>
          <p>
            Our Community Code of Conduct is a guide to how to engage on Hunome to ensure the diversity of perspectives
            and the tone of voice that allows us to explore humanity on an unprecedented level. That’s what we’re all
            about.
          </p>
          <p>
            To report a breach of our code of conduct, use our report button or email{" "}
            <Link href="mailto:cleaning@hunome.com">cleaning@hunome.com.</Link>
            <p>Last updated: July 28, 2020.</p>
          </p>
          <br />
          <Typography variant="h6" gutterBottom>
            Our Code
          </Typography>
          <p>
            By logging onto the Humone platform and engaging with the community, you are considered to be in agreement
            with this Community Code of Conduct and agree to follow these at all times. We’d also recommend following
            these guidelines when you’re off Hunome, just saying.
          </p>
          <p>1. Treat other members with the respect they deserve, just as you are better off doing in real life.</p>
          <p>
            2. Communicate with courtesy and patience. Be sincere in your contribution. 3. Be tolerant and appreciative
            toward each others’ viewpoints; disagree respectfully and justify your view.
          </p>
          <p>4. We expect civil behaviour (not inciting or excusing by race, gender, etc.).</p>
          5. Real people and real names, please. You must not impersonate someone else or create fake or multiple
          accounts.
          <p></p>
          <p>
            6. Keep it legal; illegal activities, such as illegal downloads, file sharing, or copying, are not
            permitted. Do not share content that violates any intellectual property or personal right of another party.
            Content taken from another source should be properly attributed to its original source.
          </p>
          <p>7. The community is not a place for advertisements for products, services, or events.</p>
          <p>
            8. Evil happens when good guys do nothing. Please help to keep Hunome safe, positive and constructive!
            Members take part in an effort to build an understanding together and report any members or content that
            breaches the Community Code of Conduct at cleaning@hunome.com.
          </p>
          <p>
            <LinkComponent disablePadding variant="body2" to="/terms">
              For our full Terms of Service, see here.
            </LinkComponent>
          </p>
          <br />
          <Typography variant="h6" gutterBottom>
            Breaches to the Community Code of Conduct
          </Typography>
          <p>
            The Community Code of Conduct is not intended to impose censorship on thoughts and perspectives but to
            safeguard the rights of our members and the Hunome platform.
          </p>
          <p>
            Any breaches of the Community Code of Conduct will be challenged, and may result in the removal of content
            or of member privileges and deletion of member accounts. Moderator decisions are not taken arbitrarily. If a
            breach occurs, moderators may contact members via e-mail in relation to content that has been flagged
            internally or by other members, in order to make a decision.
          </p>
          <p>
            These rules are revised every three to six months to make sure they are up-to-date and match to the
            community needs. We reserve the right to take steps and implement measures which will ensure that the
            platform serves its purpose for all our members.
          </p>
          <p>These rules were last updated July 28, 2020.</p>
        </Typography>

        {!disableActions && (
          <Box
            className={classes.buttonContainer}
            display="flex"
            justifyContent="space-between"
            alignItems="space-between"
          >
            <Button color="secondary" size="large" onClick={onBackClick}>
              Back
            </Button>
            <Button className={classes.nextBtn} variant="contained" color="primary" size="large" onClick={onNextClick}>
              Done
            </Button>
          </Box>
        )}
      </div>
    </div>
  );
};

export default React.memo(CodeofConduct);
