import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useAppBarContext } from "./TopAppBarContext";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 160,
  },
}));

export default function XAirMixerSelect() {
  const classes = useStyles();
  const { mixer, setMixer } = useAppBarContext();
  const [mixers, setMixers] = useState([]);

  useEffect(() => {
    async function fetchMixers() {
      const resp = await fetch(`/xair`);
      const json = await resp.json();
      setMixers(json.xair);
    }
    fetchMixers();
  }, []);

  useEffect(() => {
    if (mixers.length === 1) {
      setMixer(mixers[0]);
    }
  }, [mixers, setMixer]);

  return (
    <FormControl className={classes.formControl}>
      <InputLabel shrink htmlFor="mixer-select">
        Mixer
      </InputLabel>
      <Select
        id="mixer-select"
        labelId="mixer-select-label"
        value={mixer}
        onChange={(event) => setMixer(event.target.value as string)}
      >
        {mixers.map((mixer) => (
          <MenuItem key={mixer} value={mixer}>
            {mixer}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
