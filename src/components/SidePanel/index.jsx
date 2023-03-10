/* eslint-disable react/prop-types */
import React from 'react';
import './SidePanel.css';
import searchImage from '../../assets/searchImage.png';

export default function SidePanel(props) {
  const { contentTypes, setCollectionVisibility, collectionVisibility, setSelectedCollection, selectedCollection } = props;
  //   const [prev, setPrev] = React.useState(selectedCollection);
  const handleContentTypeBuilder = () => {
    setCollectionVisibility(false);
    setColor('black');
  };
  const handleCollection = (type) => {
    setCollectionVisibility(true);
    setColor('transparent');
    setSelectedCollection(type);
  };
  const [query, setQuery] = React.useState('');
  const [filteredContentTypes, setFilteredContentTypes] = React.useState(contentTypes);
  const [search, setSearch] = React.useState(false);
  React.useEffect(() => {
    const filtered = contentTypes.filter((type) => {
      return type.name.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredContentTypes(filtered);
  }, [query, contentTypes]);
  const handleSearch = () => {
    setSearch(!search);
    if(!search){
      setQuery('');
    }
  };
  React.useEffect(() => {
    if(collectionVisibility) {
      document.getElementById('contentTypeBuilder').style.backgroundColor = 'transparent';
    //   document.getElementById(selectedCollection.id).style.backgroundColor = 'black';
    //   if(prev !== selectedCollection) {
    //     document.getElementById(prev.id).style.backgroundColor = 'transparent';
    //     setPrev(selectedCollection);
    //   }
    } else {
      document.getElementById('contentTypeBuilder').style.backgroundColor = 'black';
    //   if(selectedCollection) document.getElementById(selectedCollection.id).style.backgroundColor = 'transparent';
    }
  }, [collectionVisibility, selectedCollection]);
  //   const bColor = collectionVisibility ? 'black' : 'black';
  const [color, setColor] = React.useState('transparent');
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
          {search? <input type='text' placeholder='Search' onChange={(e)=>setQuery(e.target.value)}/> : null}
          <img onClick={handleSearch} src={searchImage} alt='searchImage' />
        </div>
        <div className='collectionTypes'>
          <br/>
          <br/>
          {filteredContentTypes.map((type) => (
            <div style={{backgroundColor: {color}}} id={type.id} key={type.id} className='collectionType'onClick={()=>handleCollection(type)}>
              <p className='sidePanelCollection'>&#x2022; {type.name}</p>
              <br/>
            </div>
          ))} 
        </div>
        <br/>
        <br/>
        <h3 id='contentTypeBuilder' style={{backgroundColor:'black'}} onClick={handleContentTypeBuilder}>CONTENT TYPE BUILDER</h3>
      </div>
    </div>
  );
}