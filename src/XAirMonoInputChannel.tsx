import { Collapse, Grid, makeStyles, Paper } from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ToggleButton from "@material-ui/lab/ToggleButton";
import React, { useEffect, useState } from "react";
import { useAppBarContext } from "./TopAppBarContext";
import XAirFader from "./XAirFader";
import XAirLabel from "./XAirLabel";
import XAirMeter from "./XAirMeter";
import XAirMuteButton from "./XAirMuteButton";
import XAirSoloButton from "./XAirSoloButton";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(),
  },
  flex: {
    flexGrow: 1,
  },
  channelConfig: {
    padding: theme.spacing(0.5),
  },
}));

type XAirMonoInputChannelProps = {
  channelId: number;
};

export default function XAirMonoInputChannel({
  channelId,
}: XAirMonoInputChannelProps) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const { updateExpandables } = useAppBarContext();

  const channelName = String(channelId + 1).padStart(2, "0");

  useEffect(() => {
    updateExpandables({ type: "register", callback: setExpanded });
    return () =>
      updateExpandables({ type: "unregister", callback: setExpanded });
  }, [updateExpandables]);

  return (
    <Paper className={classes.paper}>
      <Grid container direction="column" alignItems="stretch" spacing={1}>
        <Grid item>
          <XAirLabel
            prefix={channelName}
            address={`/ch/${channelName}/config/name`}
          />
        </Grid>
        <Grid item>
          <Grid container direction="row" alignItems="center" spacing={1}>
            <Grid item>
              <XAirMuteButton address={`/ch/${channelName}/mix/on`} />
            </Grid>
            <Grid item>
              <XAirSoloButton address={`/-stat/solosw/${channelName}`} />
            </Grid>
            <Grid item className={classes.flex}>
              <XAirMeter address={"/meters/2"} meter={channelId} />
              <XAirMeter address={"/meters/2"} meter={channelId + 16} />
            </Grid>
            <Grid item>
              <ToggleButton
                size="small"
                value="check"
                onChange={() => setExpanded(!expanded)}
              >
                {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ToggleButton>
            </Grid>
          </Grid>
        </Grid>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Grid item className={classes.channelConfig}>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <XAirFader
                  faderAddress={`/ch/${channelName}/mix/fader`}
                  labelAddress="/lr/config/name"
                  altLabelName="LR"
                />
                {Array.from({ length: 6 }, (_, i) => {
                  const busId = i + 1;
                  const busName = String(busId).padStart(2, "0");
                  return (
                    <XAirFader
                      faderAddress={`/ch/${channelName}/mix/${busName}/level`}
                      labelAddress={`/bus/${busId}/config/name`}
                      altLabelName={`Bus ${busId}`}
                    />
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Collapse>
      </Grid>
    </Paper>
  );
}
