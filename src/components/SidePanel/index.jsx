/* eslint-disable react/prop-types */
import React from 'react';
import './SidePanel.css';
import searchImage from '../../assets/searchImage.png';

export default function SidePanel(props) {
  const { contentTypes, setCollectionVisibility, collectionVisibility, setSelectedCollection } = props;
  const handleContentTypeBuilder = () => {
    setCollectionVisibility(false);
  };
  const handleCollection = (type) => {
    setCollectionVisibility(true);
    setSelectedCollection(type);
  };
  const bColor = collectionVisibility ? 'transparent' : 'black';
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
            <div key={type.id} className='collectionType'onClick={()=>handleCollection(type)}>
              <p>&#x2022; {type.name}</p>
              <br/>
            </div>
          ))} 
        </div>
        <br/>
        <br/>
        <h3 style={{backgroundColor:{bColor}}} onClick={handleContentTypeBuilder}>CONTENT TYPE BUILDER</h3>
      </div>
    </div>
  );
}