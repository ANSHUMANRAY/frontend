/* eslint-disable react/prop-types */
import React from 'react';
import './NewTypeModal.css';
import axios from 'axios';

export default function NewTypeModal(props) {
  const { setOnChange, onChange, setSelectedType, setVisibility } = props;
  const createType = () => {
    const token = localStorage.getItem('token');
    const name = document.getElementById('name').value;
    const fields = [];
    axios.post('http://localhost:8080/contentTypes', { name, fields }, { headers: { Authorization: token } })
      .then((response) => {
        setSelectedType(response.data);
        setOnChange(!onChange);
      })
      .catch((error) => {
        console.log(error);
      });
    setVisibility(false);
  };
  return (
    <div className="newTypeModalContainerOut">
      <div className="newTypeModalContainer">
        <h1>Create a new content type</h1>
        <div className='newTypeModalContent'>
          <label htmlFor="name">Name of the content type</label>
          <br/>
          <input type="text" name="name" id="name" className='input'/>
        </div>
        <div className='newTypeModalButtons'>
          <button onClick={()=>setVisibility(false)} type="cancel">Cancel</button>
          <button onClick={createType} type="submit">Create</button>
        </div>
      </div>
    </div>
  );
}