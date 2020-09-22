import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ReconnectSnackbar from "./ReconnectSnackbar";
import { useAppBarContext } from "./TopAppBarContext";
import { XAirDetector } from "./XAirDetector";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 160,
  },
}));

export default function XAirMixerSelect() {
  const classes = useStyles();
  const { mixer, setMixer } = useAppBarContext();
  const [mixers, setMixers] = useState<string[]>([]);
  const [backoff, setBackoff] = useState<number | null>(null);

  useEffect(() => {
    const detector = new XAirDetector(setMixers, setBackoff);
    return () => {
      detector.close();
    };
  }, [setMixers, setBackoff]);

  useEffect(() => {
    if (mixers.length === 0) {
      setMixer("");
    } else if (!mixer) {
      setMixer(mixers[0]);
    }
  }, [mixer, mixers, setMixer]);

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor="mixer-select">
          Mixer
        </InputLabel>
        <Select
          id="mixer-select"
          labelId="mixer-select-label"
          displayEmpty
          value={mixers.includes(mixer) ? mixer : ""}
          onChange={(event) => setMixer(event.target.value as string)}
        >
          {mixers.length === 0 ? (
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
          ) : (
            mixers.map((mixer) => (
              <MenuItem key={mixer} value={mixer}>
                {mixer}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
      <ReconnectSnackbar backoff={backoff} />
    </>
  );
}
