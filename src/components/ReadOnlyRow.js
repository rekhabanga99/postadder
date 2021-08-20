import React from "react";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick,viewOnly }) => {
  return (
    <tr>
      <td>{contact.id}</td>
      <td>{contact.userId}</td>
      <td>{contact.title}</td>
      <td>{contact.completed?"true":"false"}</td>
      {viewOnly?null:
      <td>

        <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(contact.id)}>
          Delete
        </button>
      </td>}
    </tr>
  );
};

export default ReadOnlyRow;
