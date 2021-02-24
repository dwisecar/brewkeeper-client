import React from "react";
import { Form, Button } from "react-bootstrap";

const editUser = ({ handleEdit, user }) => {
  return (
    <Form onSubmit={handleEdit} style={{ padding:'10px'}}>
      <h2>Edit Username</h2>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          className="nav-search"
          name="username"
          type="username"
          defaultValue={user.username}
        />
      </Form.Group>

      <Button variant="danger" type="submit">
        Update
      </Button>
    </Form>
  );
};
export default editUser;