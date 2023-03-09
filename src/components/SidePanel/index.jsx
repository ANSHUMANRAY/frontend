/* eslint-disable react/prop-types */
import React from 'react';
import './SidePanel.css';
import searchImage from '../../assets/searchImage.png';

export default function SidePanel(props) {
  const { contentTypes, setSelectedType } = props;
  return (
    <div className="sidePanelContainer">
      <div className='sidePanelHeader'>
        <h1>CMS+</h1>
      </div>
      <br/>
      <br/>
      <div className='sidePanelContent'>
        <div className='collectionTypesHeader'>
          <h3>COLLECTION TYPES</h3>
          <img src={searchImage} alt='searchImage' />
        </div>
        <div className='collectionTypes'>
          <br/>
          <br/>
          {contentTypes.map((type) => (
            <div key={type.id} className='collectionType'onClick={()=>setSelectedType(type)}>
              <p>&#x2022; {type.name}</p>
            </div>
          ))} 
        </div>
        <br/>
        <br/>
        <h3 className='contentTypeBuilder'>CONTENT TYPE BUILDER</h3>
      </div>
    </div>
  );
}