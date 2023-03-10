/* eslint-disable react/prop-types */
import React from 'react';
import './EditCollectionsModal.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export default function EditCollectionsModal(props) {
  const navigate = useNavigate();
  const { selectedCollection, onChange, setOnChange, content, setEditCollectionsModalVisibility} = props;
  React.useEffect(() => {
    selectedCollection.fields.forEach((field) => {
      document.getElementById(field).value = content.entry[field] ? content.entry[field] : '';
    });
  }, []);
  const editCollection = () => {
    const newEntry = {};
    selectedCollection.fields.forEach((field) => {
      newEntry[field] = document.getElementById(field).value;
    });
    console.log('content ', content);
    console.log('selectedCollection ', selectedCollection);
    const token = localStorage.getItem('token');
    if(!token) navigate('/login');

    axios.put(`http://localhost:8080/collections/${content.id}`, { entry: newEntry}, {headers: {Authorization: localStorage.getItem('token')}})
      .then((response) => {
        console.log(response.data);
        setOnChange(!onChange);
      }
      ).catch((error) => {
        if(error.response.status === 401) {
          navigate('/login');
          alert('You are not authorized to perform this action');
        }
        console.log(error);
      }
      );
    setEditCollectionsModalVisibility(false);
  };
  return (
    <div className="editCollectionsModalContainerOut">
      <div className="editCollectionsModalContainer">
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
          <button id='cancelButton' onClick={()=>setEditCollectionsModalVisibility(false)} type="cancel">Cancel</button>
          <button onClick={editCollection} type="submit">Add</button>
        </div>
      </div>
    </div>
  );
}