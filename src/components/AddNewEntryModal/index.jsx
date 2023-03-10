/* eslint-disable react/prop-types */
import React from 'react';
import './AddNewEntryModal.css';
import axios from 'axios';

export default function AddNewEntryModal(props) {
  const { setEntryModalVisibility, selectedCollection, onChange, setOnChange } = props;
  const createCollection = () => {
    const newEntry = {};
    selectedCollection.fields.forEach((field) => {
      newEntry[field] = document.getElementById(field).value;
    });
    axios.post('http://localhost:8080/collections', {contentTypeId: selectedCollection.id, entry: newEntry}, {headers: {Authorization: localStorage.getItem('token')}})
      .then((response) => {
        console.log(response.data);
        setOnChange(!onChange);
      })
      .catch((error) => {
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
          <button onClick={()=>setEntryModalVisibility(false)} type="cancel">Cancel</button>
          <button onClick={createCollection} type="submit">Add</button>
        </div>
      </div>
    </div>
  );
}