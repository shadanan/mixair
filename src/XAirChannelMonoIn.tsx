import { Collapse, Grid, makeStyles, Paper } from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ToggleButton from "@material-ui/lab/ToggleButton";
import React, { useEffect, useState } from "react";
import { useAppBarContext } from "./TopAppBarContext";
import XAirFader from "./XAirFader";
import XAirGain from "./XAirGain";
import XAirLabel from "./XAirLabel";
import XAirMeterMonoIn from "./XAirMeterMonoIn";
import XAirToggleButtonAdUsb from "./XAirToggleButtonAdUsb";
import XAirToggleButtonMute from "./XAirToggleButtonMute";
import XAirToggleButtonSolo from "./XAirToggleButtonSolo";

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

type XAirMonoInChannelProps = {
  channelId: number;
};

export default function XAirChannelMonoIn({
  channelId,
}: XAirMonoInChannelProps) {
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
              <XAirToggleButtonMute address={`/ch/${channelName}/mix/on`} />
            </Grid>
            <Grid item>
              <XAirToggleButtonSolo address={`/-stat/solosw/${channelName}`} />
            </Grid>
            <Grid item className={classes.flex}>
              <XAirMeterMonoIn
                meterAddress={"/meters/2"}
                channelId={channelId}
                adUsbAddress={`/ch/${channelName}/preamp/rtnsw`}
              />
            </Grid>
            <Grid item>
              <XAirToggleButtonAdUsb
                address={`/ch/${channelName}/preamp/rtnsw`}
              />
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
                <XAirGain gainAddress={`/headamp/${channelName}/gain`} />
                {Array.from({ length: 6 }, (_, i) => {
                  const busId = i + 1;
                  const busName = String(busId).padStart(2, "0");
                  return (
                    <XAirFader
                      key={busId}
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
