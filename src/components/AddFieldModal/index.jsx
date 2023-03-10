/* eslint-disable react/prop-types */
import React from 'react';
import './AddFieldModal.css';
import axios from 'axios';

export default function AddFieldModal(props) {
  const {setFieldVisibility, setOnChange, onChange, selectedType, setSelectedType} = props;
  const createField = () => {
    const token = localStorage.getItem('token');
    const name = document.getElementById('name').value;
    const fields = [...selectedType.fields, name];
    axios.put(`http://localhost:8080/contentTypes/${selectedType.id}`, {name: selectedType.name, fields}, {headers: {Authorization: token}})
      .then((response) => {
        console.log(response.data);
        setOnChange(!onChange);
        setSelectedType(response.data);
      }
      ).catch((error) => {
        console.log(error);
      });
    setFieldVisibility(false);
  };
  return (
    <div className="addFieldModalContainerOut">
      <div className="addFieldModalContainer">
        <h1>Create a new content type</h1>
        <div className='addFieldModalContent'>
          <label htmlFor="name">Name of the new field</label>
          <br/>
          <input type="text" name="name" id="name" className='input'/>
        </div>
        <div className='addFieldModalButtons'>
          <button onClick={()=>setFieldVisibility(false)} type="cancel">Cancel</button>
          <button onClick={createField} type="submit">Create</button>
        </div>
      </div>
    </div>
  );
}