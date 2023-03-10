/* eslint-disable react/prop-types */
import React from 'react';
import './EditFieldModal.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function EditFieldModal(props) {
  const navigate = useNavigate();
  const { setEditFieldVisibility, setOnChange, onChange, selectedType, setSelectedType, field} = props;

  const handleEdit = () => {
    const token = localStorage.getItem('token');
    if(!token) navigate('/login');
    const name = document.getElementById('name').value;
    axios.patch(`http://localhost:8080/fields/${selectedType.id}`, {newName: name, oldName: field}, {headers: {Authorization: token}})
      .then((response) => {
        console.log(response.data);
        setOnChange(!onChange);
        setSelectedType(response.data);
      }
      ).catch((error) => {
        if(error.response.status === 401) {
          navigate('/login');
          alert('You are not authorized to perform this action');
        }
        console.log(error);
      }
      );
    setEditFieldVisibility(false);
  };
    
  return (
    <div className="editFieldModalContainerOut">
      <div className="editFieldModalContainer">
        <h1>Edit field</h1>
        <div className='editFieldModalContent'>
          <label htmlFor="name">Edit the name of the field</label>
          <br/>
          <input type="text" name="name" id="name" className='input' defaultValue={field}/>
        </div>
        <div className='editFieldModalButtons'>
          <button id='cancelButton' onClick={()=>setEditFieldVisibility(false)} type="cancel">Cancel</button>
          <button onClick={handleEdit} type="submit">Create</button>
        </div>
      </div>
    </div>
  );
}
