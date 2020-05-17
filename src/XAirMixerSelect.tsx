import { makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Paper from "@material-ui/core/Paper";
import GraphicEqIcon from "@material-ui/icons/GraphicEq";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2),
  },
}));

export default function XAirMixerSelect() {
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
