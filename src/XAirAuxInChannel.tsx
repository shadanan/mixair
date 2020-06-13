import { Collapse, Grid, makeStyles, Paper } from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ToggleButton from "@material-ui/lab/ToggleButton";
import React, { useEffect, useState } from "react";
import { useAppBarContext } from "./TopAppBarContext";
import XAirAuxInMeter from "./XAirAuxInMeter";
import XAirFader from "./XAirFader";
import XAirLabel from "./XAirLabel";
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

export default function XAirAuxInChannel() {
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
          <XAirLabel prefix="Aux" address="/rtn/aux/config/name" />
        </Grid>
        <Grid item>
          <Grid container direction="row" alignItems="center" spacing={1}>
            <Grid item>
              <XAirMuteButton address="/rtn/aux/mix/on" />
            </Grid>
            <Grid item>
              <XAirSoloButton address="/-stat/solosw/17" />
            </Grid>
            <Grid item className={classes.flex}>
              <XAirAuxInMeter />
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
                  faderAddress="/rtn/aux/mix/fader"
                  labelAddress="/lr/config/name"
                  altLabelName="LR"
                />
                {Array.from({ length: 6 }, (_, i) => {
                  const busId = i + 1;
                  const busName = String(busId).padStart(2, "0");
                  return (
                    <XAirFader
                      key={busId}
                      faderAddress={`/rtn/aux/mix/${busName}/level`}
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
