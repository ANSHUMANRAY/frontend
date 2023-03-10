/* eslint-disable react/prop-types */
import React from 'react';
import './ContentTypePanel.css';
import searchImage from '../../assets/searchImage.png';

export default function ContentTypePanel(props) {
  const { contentTypes, setSelectedType, setVisibility } = props;
  return (
    <div className="contentTypePanelContainer">
      <div className='contentTypePanelHeader'>
        <h3>{contentTypes.length} Types</h3>
        <img src={searchImage} alt='searchImage' />
      </div>
      <div onClick={()=>setVisibility(true)} className='NewType'>
        <h2>+ New Type</h2>
      </div>
      <div className='contentTypes'>
        {contentTypes.map((type) => {
          return(
            <div key={type.id} className='contentType' onClick={()=>setSelectedType(type)}>
              <h2>{type.name}</h2>
              <h2>{type.fields.length}</h2>
            </div>
          );})}
      </div>
    </div>
  );
}