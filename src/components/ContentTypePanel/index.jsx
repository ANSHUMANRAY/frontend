/* eslint-disable react/prop-types */
import React from 'react';
import './ContentTypePanel.css';
import searchImage from '../../assets/searchImage.png';

export default function ContentTypePanel(props) {
  const { contentTypes } = props;
  return (
    <div className="contentTypePanelContainer">
      <div className='contentTypePanelHeader'>
        <h3>{contentTypes.length} Types</h3>
        <img src={searchImage} alt='searchImage' />
      </div>
      <div className='NewType'>
        <h2>+ New Type</h2>
      </div>
      {contentTypes.map((type) => {
        return(
          <div key={type.id} className='contentType'>
            <h2>{type.name}</h2>
          </div>
        );})}
    </div>
  );
}