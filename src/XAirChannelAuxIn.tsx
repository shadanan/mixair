import { Collapse, Grid, makeStyles, Paper } from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ToggleButton from "@material-ui/lab/ToggleButton";
import React, { useEffect, useState } from "react";
import { useAppBarContext } from "./TopAppBarContext";
import XAirLabel from "./XAirLabel";
import XAirLabeledLevelFader from "./XAirLabeledLevelFader";
import XAirLabeledLevelTrim from "./XAirLabeledLevelTrim";
import XAirMeterInAux from "./XAirMeterInAux";
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

export default function XAirChannelAuxIn() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const { updateExpandables } = useAppBarContext();

  useEffect(() => {
    updateExpandables({ type: "register", callback: setExpanded });
    return () =>
      updateExpandables({ type: "unregister", callback: setExpanded });
  }, [updateExpandables]);

  return (
    <Paper className={classes.paper}>
      <Grid container direction="column" alignItems="stretch" spacing={1}>
        <Grid item>
          <XAirLabel prefix="Aux" configAddress="/rtn/aux/config" />
        </Grid>
        <Grid item>
          <Grid container direction="row" alignItems="center" spacing={1}>
            <Grid item>
              <XAirToggleButtonMute address="/rtn/aux/mix/on" />
            </Grid>
            <Grid item>
              <XAirToggleButtonSolo address="/-stat/solosw/17" />
            </Grid>
            <Grid item className={classes.flex}>
              <XAirMeterInAux />
            </Grid>
            <Grid item>
              <XAirToggleButtonAdUsb address="/rtn/aux/preamp/rtnsw" />
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
                <XAirLabeledLevelFader
                  faderAddress="/rtn/aux/mix/fader"
                  configAddress="/lr/config"
                  altLabelName="LR"
                />
                <XAirLabeledLevelTrim />
                {Array.from({ length: 6 }, (_, i) => {
                  const busId = i + 1;
                  const busName = String(busId).padStart(2, "0");
                  return (
                    <XAirLabeledLevelFader
                      key={busId}
                      faderAddress={`/rtn/aux/mix/${busName}/level`}
                      configAddress={`/bus/${busId}/config`}
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
