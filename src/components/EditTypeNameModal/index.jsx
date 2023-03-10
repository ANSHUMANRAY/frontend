/* eslint-disable react/prop-types */
import React from 'react';
import './EditTypeNameModal.css';
import axios from 'axios';

export default function EditTypeNameModal(props) {
  const { selectedType, setSelectedType, onChange, setOnChange, setEditTypeNameModalVisibility} = props;
  React.useEffect(() => {
    document.getElementById('name').value = selectedType.name ? selectedType.name : '';
  }, []);
  const handleEdit = () => {
    const token = localStorage.getItem('token');
    const name = document.getElementById('name').value;
    const fields = [...selectedType.fields];
    axios.put(`http://localhost:8080/contentTypes/${selectedType.id}`, {name, fields}, {headers: {Authorization: token}})
      .then((response) => {
        console.log(response.data);
        setSelectedType(response.data);
        setOnChange(!onChange);
      }
      ).catch((error) => {
        console.log(error);
      });
    setEditTypeNameModalVisibility(false);
  };

  return (
    <div className="editTypeNameModalContainerOut">
      <div className="editTypeNameModalContainer">
        <h1>Create a new content type</h1>
        <div className='editTypeNameModalContent'>
          <label htmlFor="name">Edit the name of the field</label>
          <br/>
          <input type="text" name="name" id="name" className='input' />
        </div>
        <div className='editTypeNameModalButtons'>
          <button onClick={()=>setEditTypeNameModalVisibility(false)} type="cancel">Cancel</button>
          <button onClick={handleEdit} type="submit">Create</button>
        </div>
      </div>
    </div>
  );
}