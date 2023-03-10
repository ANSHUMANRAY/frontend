/* eslint-disable react/prop-types */
import React from 'react';
import './AddNewEntryModal.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddNewEntryModal(props) {
  const navigate = useNavigate();
  const { setEntryModalVisibility, selectedCollection, onChange, setOnChange } = props;
  const createCollection = () => {
    const newEntry = {};
    selectedCollection.fields.forEach((field) => {
      newEntry[field] = document.getElementById(field).value;
    });
    const token = localStorage.getItem('token');
    if(!token) navigate('/login');
    axios.post('http://localhost:8080/collections', {contentTypeId: selectedCollection.id, entry: newEntry}, {headers: {Authorization: token}})
      .then((response) => {
        console.log(response.data);
        setOnChange(!onChange);
      })
      .catch((error) => {
        if(error.response.status === 401) {
          navigate('/login');
          alert('You are not authorized to perform this action');
        }
        console.log(error);
      });
    setEntryModalVisibility(false);
  };
  return (
    <div className="addNewEntryModalContainerOut">
      <div className="addNewEntryModalContainer">
        <h1>New {selectedCollection.name}</h1>
        {selectedCollection.fields.map((field, index) => {
          return (
            <div key={index} className='field'>
              <label>{field}</label>
              <br/>
              <input type='text' id={field}/>
            </div>
          );
        })}
        <div className='buttons'>
          <button id='cancelButton' onClick={()=>setEntryModalVisibility(false)} type="cancel">Cancel</button>
          <button onClick={createCollection} type="submit">Add</button>
        </div>
      </div>
    </div>
  );
}