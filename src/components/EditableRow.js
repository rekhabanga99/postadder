import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  const maxChar = 5

  return (
    <tr>
      <td>
        <input
          type="number"
          required="required"
          placeholder="Enter a Id"
          name="Id"
          value={editFormData.id}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter an userId"
          name="userId"
          value={editFormData.userId}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a title"
          name="title"
          value={editFormData.tile && editFormData.title.length > maxChar?editFormData.title.substring(0, maxChar) + " . . .":editFormData.title}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter an status"
          name="complete"
          value={editFormData.completed?"true":"false"}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
