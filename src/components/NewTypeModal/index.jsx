/* eslint-disable react/prop-types */
import React from 'react';
import './NewTypeModal.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function NewTypeModal(props) {
  const navigate = useNavigate();
  const { setOnChange, onChange, setSelectedType, setVisibility } = props;
  const createType = () => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
    const name = document.getElementById('name').value;
    const fields = [];
    axios.post('http://localhost:8080/contentTypes', { name, fields }, { headers: { Authorization: token } })
      .then((response) => {
        setSelectedType(response.data);
        setOnChange(!onChange);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate('/login');
          alert('You are not authorized to perform this action');
        }
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
          <button id='cancelButton' onClick={()=>setVisibility(false)} type="cancel">Cancel</button>
          <button onClick={createType} type="submit">Create</button>
        </div>
      </div>
    </div>
  );
}