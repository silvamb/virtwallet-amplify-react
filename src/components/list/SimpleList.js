import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import EmptyList from "./EmptyList";

const DefaultListItem = (item, index) => {
  return (
    <ListItem key={`item${index}`} button>
      <ListItemText primary={item.id} />
    </ListItem>
  )
}

export default function SimpleList({
  data = [],
  listItemComponent = DefaultListItem,
  onRefresh
}) {

  return (
    data.length > 0 ?
      <List component="nav" aria-label="list">
        {data.map((item, index) => {
          return listItemComponent(item, index);
        })}
      </List>
    :
      <EmptyList title="Empty List" message="No items have been loaded." onRefresh={onRefresh} />
  );
}
