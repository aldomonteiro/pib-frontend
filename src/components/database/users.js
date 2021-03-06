import React from "react";
import { List, Datagrid, EmailField, TextField } from "react-admin";

export const UserList = props => (
  <List title="All users" {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
    </Datagrid>
  </List>
);
