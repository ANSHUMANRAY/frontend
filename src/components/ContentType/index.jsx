/* eslint-disable react/prop-types */
import React from 'react';
import './ContentType.css';
import editPencilImage from '../../assets/editPencilImage.png';
import deleteImage from '../../assets/deleteImage.png';
import editImage from '../../assets/editImage.png';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export default function ContentType(props) {
  const navigate = useNavigate();
  const { selectedType, setFieldVisibility, onChange,  setOnChange, setSelectedType, setEditTypeNameModalVisibility, setEditFieldVisibility, setField } = props;
  const handleDelete = (name) => {
    const token = localStorage.getItem('token');
    if(!token) navigate('/login');
    axios.patch(`http://localhost:8080/contentTypes/${selectedType.id}`, {name}, {headers: {authorization: localStorage.getItem('token')}})
      .then((response) => {
        console.log(response.data);
        setSelectedType(response.data);
        setOnChange(!onChange);
      }).catch((error) => {
        if(error.response.status === 401) {
          navigate('/login');
          alert('You are not authorized to perform this action');
        }
        console.log(error);
      });
  };
  const handleEdit = (name) => {
    setField(name);
    setEditFieldVisibility(true);
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
                <img onClick={()=>handleEdit(field)} src={editImage} alt='editImage' />
                <img onClick={()=>handleDelete(field)} src={deleteImage} alt='deleteImage' />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ): null;
}