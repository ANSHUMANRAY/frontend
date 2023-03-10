/* eslint-disable react/prop-types */
import React from 'react';
import './ContentTypePanel.css';
import searchImage from '../../assets/searchImage.png';

export default function ContentTypePanel(props) {
  const { contentTypes, setSelectedType, setVisibility } = props;
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
  return (
    <div className="contentTypePanelContainer">
      <div className='contentTypePanelHeader'>
        <h3>{contentTypes.length} Types</h3>
        {search? <input type='text' placeholder='Search' onChange={(e)=>setQuery(e.target.value)}/> : null}
        <img onClick={handleSearch} src={searchImage} alt='searchImage' />
      </div>
      <div onClick={()=>setVisibility(true)} className='NewType'>
        <h2>+ New Type</h2>
      </div>
      <div className='contentTypes'>
        {filteredContentTypes.map((type) => {
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