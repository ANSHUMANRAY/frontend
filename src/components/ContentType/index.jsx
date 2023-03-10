/* eslint-disable react/prop-types */
import React from 'react';
import './ContentType.css';
import editPencilImage from '../../assets/editPencilImage.png';
import deleteImage from '../../assets/deleteImage.png';
import editImage from '../../assets/editImage.png';
import axios from 'axios';

export default function ContentType(props) {
  const { selectedType, setFieldVisibility, onChange,  setOnChange, setSelectedType, setEditTypeNameModalVisibility } = props;
  const handleDelete = (name) => {
    axios.patch(`http://localhost:8080/contentTypes/${selectedType.id}`, {name}, {headers: {authorization: localStorage.getItem('token')}})
      .then((response) => {
        console.log(response.data);
        setSelectedType(response.data);
        setOnChange(!onChange);
      }).catch((error) => {
        console.log(error);
      });
  };
  return selectedType ? (
    <div className="contentTypeContainer">
      <div className='contentTypeHeader'>
        <div className='contentTypeName'>
          <h1>{selectedType.name}</h1>
          <img onClick={()=>setEditTypeNameModalVisibility(true)} src={editPencilImage} alt='editPencilImage' />
        </div>
        <h2>{selectedType.fields.length} Fields</h2>
      </div>
      <div onClick={()=>(setFieldVisibility(true))} className='addNewField'>
        <h2>Add another field</h2>
      </div>
      {selectedType.fields.map((field, index) => {
        return (
          <div key={index} className='field'>
            <div className='fieldName'>
              <h1 className='tag'>Ab</h1>
              <h2>{field}</h2>
            </div>
            <div className='fieldRest'>
              <h2>Text</h2>
              <div className='fieldButtons'>
                <img src={editImage} alt='editImage' />
                <img onClick={()=>handleDelete(field)} src={deleteImage} alt='deleteImage' />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ): null;
}