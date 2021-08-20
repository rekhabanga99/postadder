
import ReadOnlyRow from "../components/ReadOnlyRow";
import EditableRow from "../components/EditableRow";
import React, { useState, Fragment, useEffect } from "react";
import "../App.css";
let data = []
const App = () => {


  React.useMemo(() => {

    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => {
        setContacts(json)
      }
      )
  }, [])

  var new_body = {
    id: document.getElementById("id") && document.getElementById("id").value ? document.getElementById("id").value : '',
    userId:  document.getElementById("userId") &&  document.getElementById("userId").value ? document.getElementById("userId").value : '',
    title: document.getElementById("title")&& document.getElementById("title").value ? document.getElementById("title").value : '',
    completed: document.getElementById("completed")&& document.getElementById("completed").value ? document.getElementById("completed").value : ''
  }

  const [contacts, setContacts] = useState(data);

  const [addFormData, setAddFormData] = useState({
    id: "",
    userId: "",
    title: "",
    completed: "",
  });

  const [editFormData, setEditFormData] = useState({
    id: "",
    userId: "",
    title: "",
    completed: "",
  });

  const [editContactId, setEditContactId] = useState(null);



  const handleAddFormChange = (event) => {
    setAddFormData(new_body);
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");

    const fieldValue = event.target.value;

    // const newFormData = {};
    // newFormData[fieldName] = fieldValue;




    //  console.log('name===================',newFormData)

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        body: new_body,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => console.log(json))


  };




  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    console.log('fieldName----------', fieldName)
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);

  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    console.log('newContact---------------', contacts)

    const newContacts = [...contacts, new_body];
    setContacts(newContacts);
  };




  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editFormData.id,
      userId: editFormData.userId,
      title: editFormData.title,
      completed: editFormData.completed
    };

    console.log('editedContact', editedContact)

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    console.log('contact==========', contact)
    setEditContactId(contact.id);

    const formValues = {
      id: contact.id,
      userId: contact.userId,
      title: contact.title,
      completed: contact.completed,
    };

    setEditFormData(formValues);
  };




  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th style={{ width: '10%' }}>Id</th>
              <th style={{ width: '10%' }}>UserId</th>
              <th>Title</th>
              <th>Completed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add a User</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="number"
          id="id"
          required="required"
          placeholder="Enter a id"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          id="userId"
          required="required"
          placeholder="Enter an userId"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          id="title"
          required="required"
          placeholder="Enter a title"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          id="completed"
          required="required"
          placeholder="Enter an status"
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default App;
