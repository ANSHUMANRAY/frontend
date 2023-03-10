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
          {search? <input type='text' placeholder='Search' onChange={(e)=>setQuery(e.target.value)}/> : null}
          <img onClick={handleSearch} src={searchImage} alt='searchImage' />
        </div>
        <div className='collectionTypes'>
          <br/>
          <br/>
          {filteredContentTypes.map((type) => (
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