import {
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  makeStyles,
  Paper,
} from "@material-ui/core";
import GraphicEqIcon from "@material-ui/icons/GraphicEq";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2),
  },
}));

function MixerSelect() {
  const classes = useStyles();
  const [mixers, setMixers] = useState([]);

  useEffect(() => {
    async function fetchMixers() {
      const resp = await fetch(`/xair`);
      const json = await resp.json();
      setMixers(json.xair);
    }
    fetchMixers();
  }, []);

  return (
    <Container>
      <Paper className={classes.paper}>
        <List subheader={<ListSubheader>Connect to Mixer</ListSubheader>}>
          {mixers.map((mixer) => (
            <ListItem
              button
              key={mixer}
              component={Link}
              to={`/mixer/${mixer}`}
            >
              <ListItemIcon>
                <GraphicEqIcon />
              </ListItemIcon>
              <ListItemText primary={mixer}></ListItemText>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default MixerSelect;
