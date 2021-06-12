import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

const useStyles = makeStyles((theme) => ({
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
  listSection: {
    backgroundColor: "inherit",
  },
}));

const DefaultListItem = (item) => {
  return (
    <>
      <ListItemText primary={item.text} />
    </>
  );
};

const noop = () => undefined;

const SubList = ({
  group,
  data,
  groupIndex,
  classes,
  isButton = true,
  onClick = noop,
  listItemComponent = DefaultListItem,
}) => {
  return (
    <li key={`group${groupIndex}`} className={classes.listSection}>
      <ul className={classes.ul}>
        <ListSubheader>{group}</ListSubheader>
        {data.map((item, itemIndex) => {
          return (
            <ListItem
              key={`group${groupIndex}-item${itemIndex}`}
              button={isButton}
              onClick={onClick}
            >
              {listItemComponent(item)}
            </ListItem>
          );
        })}
      </ul>
    </li>
  );
};

export default function NestedList({
  groupedData = [],
  listItemComponent = DefaultListItem,
  onClick = noop,
  isButton = true,
}) {
  const classes = useStyles();
  return (
    <List subheader={<li />}>
      {groupedData.map(({ group = "", data = [] }, groupIndex) => (
        <SubList
          group={group}
          data={data}
          groupIndex={groupIndex}
          classes={classes}
          isButton={isButton}
          onClick={onClick}
          listItemComponent={listItemComponent}
          key={`sublist${groupIndex}`}
        />
      ))}
    </List>
  );
}
