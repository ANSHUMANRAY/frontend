/* eslint-disable react/prop-types */
import React from 'react';
import './EditCollectionsModal.css';
import axios from 'axios';

export default function EditCollectionsModal(props) {
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
    axios.put(`http://localhost:8080/collections/${content.id}`, { entry: newEntry}, {headers: {Authorization: localStorage.getItem('token')}})
      .then((response) => {
        console.log(response.data);
        setOnChange(!onChange);
      }
      ).catch((error) => {
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
          <button onClick={()=>setEditCollectionsModalVisibility(false)} type="cancel">Cancel</button>
          <button onClick={editCollection} type="submit">Add</button>
        </div>
      </div>
    </div>
  );
}