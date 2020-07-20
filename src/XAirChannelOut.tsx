import { Collapse, Grid, makeStyles, Paper } from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ToggleButton from "@material-ui/lab/ToggleButton";
import React, { useEffect, useState } from "react";
import { useAppBarContext } from "./TopAppBarContext";
import XAirFader from "./XAirFader";
import XAirLabel from "./XAirLabel";
import XAirMeterOut from "./XAirMeterOut";
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

type ChannelOutProps = {
  channelName: string;
  configAddress: string;
  muteAddress: string;
  soloAddress: string;
  faderAddress: string;
  meterIds: number[];
};

export default function XAirChannelOut({
  channelName,
  configAddress,
  muteAddress,
  soloAddress,
  faderAddress,
  meterIds,
}: ChannelOutProps) {
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
          <XAirLabel prefix={channelName} configAddress={configAddress} />
        </Grid>
        <Grid item>
          <Grid container direction="row" alignItems="center" spacing={1}>
            <Grid item>
              <XAirToggleButtonMute address={muteAddress} />
            </Grid>
            <Grid item>
              <XAirToggleButtonSolo address={soloAddress} />
            </Grid>
            <Grid item className={classes.flex}>
              <XAirMeterOut
                address={"/meters/5"}
                channelIds={meterIds}
                label={channelName}
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
                <XAirFader address={faderAddress} />
              </Grid>
            </Grid>
          </Grid>
        </Collapse>
      </Grid>
    </Paper>
  );
}
