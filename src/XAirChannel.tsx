import { Collapse, Grid, makeStyles, Paper } from "@material-ui/core";
import { red, yellow } from "@material-ui/core/colors";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ToggleButton from "@material-ui/lab/ToggleButton";
import React, { useEffect, useState } from "react";
import { useAppBarContext } from "./TopAppBarContext";
import { XAir } from "./XAir";
import XAirFader from "./XAirFader";
import XAirLabel from "./XAirLabel";
import XAirMeter from "./XAirMeter";
import XAirToggleButton from "./XAirToggleButton";

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

type ChannelProps = {
  xair: XAir;
  channelName: string;
  nameAddress: string;
  muteAddress: string;
  soloAddress: string;
  faderAddress: string;
  meterId?: number;
  expandedDefault?: boolean;
};

export default function XAirChannel({
  xair,
  channelName,
  nameAddress,
  muteAddress,
  soloAddress,
  faderAddress,
  meterId,
}: ChannelProps) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const { updateExpandables } = useAppBarContext();

  useEffect(() => {
    updateExpandables({ type: "register", callback: setExpanded });
    return () =>
      updateExpandables({ type: "unregister", callback: setExpanded });
  }, [updateExpandables]);

  let a2dLevel = <></>;
  let usbLevel = <></>;
  if (meterId !== undefined) {
    a2dLevel = <XAirMeter xair={xair} address={"/meters/2"} meter={meterId} />;
    usbLevel = (
      <XAirMeter xair={xair} address={"/meters/2"} meter={meterId + 16} />
    );
  }

  return (
    <Paper className={classes.paper}>
      <Grid container direction="column" alignItems="stretch" spacing={1}>
        <Grid item>
          <XAirLabel xair={xair} prefix={channelName} address={nameAddress} />
        </Grid>
        <Grid item>
          <Grid container direction="row" alignItems="center" spacing={1}>
            <Grid item>
              <XAirToggleButton
                xair={xair}
                address={muteAddress}
                color={red[500]}
                invert={true}
              >
                M
              </XAirToggleButton>
            </Grid>
            <Grid item>
              <XAirToggleButton
                xair={xair}
                address={soloAddress}
                color={yellow[500]}
              >
                S
              </XAirToggleButton>
            </Grid>
            <Grid item className={classes.flex}>
              {a2dLevel}
              {usbLevel}
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
                  xair={xair}
                  faderAddress={faderAddress}
                  labelAddress="/lr/config/name"
                />
              </Grid>
            </Grid>
          </Grid>
        </Collapse>
      </Grid>
    </Paper>
  );
}
