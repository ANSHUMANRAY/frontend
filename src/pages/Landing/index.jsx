import React from 'react';
import './Landing.css';
import SidePanel from '../../components/SidePanel';
import axios from 'axios';
import ContentTypePanel from '../../components/ContentTypePanel';
import ContentType from '../../components/ContentType';
import NewTypeModal from '../../components/NewTypeModal';
import AddFieldModal from '../../components/AddFieldModal';
import Collections from '../../components/Collections';
import Header from '../../components/Header';
import AddNewEntryModal from '../../components/AddNewEntryModal';
import EditTypeNameModal from '../../components/EditTypeNameModal';
import EditCollectionsModal from '../../components/EditCollectionsModal';
import EditFieldModal from '../../components/EditFieldModal';

export default function Landing() {
  const [contentTypes, setContentTypes] = React.useState([]);
  const [selectedType, setSelectedType] = React.useState();
  const [onChange, setOnChange] = React.useState(false);
  const [visibility, setVisibility] = React.useState(false);
  const [fieldVisibility, setFieldVisibility] = React.useState(false);
  const [collectionVisibility, setCollectionVisibility] = React.useState(false);
  const [selectedCollection, setSelectedCollection] = React.useState();
  const [entryModalVisibility, setEntryModalVisibility] = React.useState(false);
  const [editTypeNameModalVisibility, setEditTypeNameModalVisibility] = React.useState(false);
  const [content, setContent] = React.useState();
  const [editCollectionsModalVisibility, setEditCollectionsModalVisibility] = React.useState(false);
  const [field, setField] = React.useState();
  const [editFieldVisibility, setEditFieldVisibility] = React.useState(false);
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }
    axios.get('http://localhost:8080/contentTypes', { headers: { Authorization: token } })
      .then((response) => {
        setContentTypes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [onChange]);
  console.log('visibility', entryModalVisibility);
  return collectionVisibility ? (
    <div className="collectionContainer">
      <SidePanel contentTypes={contentTypes} setCollectionVisibility={setCollectionVisibility} collectionVisibility={collectionVisibility} setSelectedCollection={setSelectedCollection}/>
      <div className="body">
        <Header heading={selectedCollection.name}/>
        <Collections selectedCollection={selectedCollection} setEntryModalVisibility={setEntryModalVisibility} onChange={onChange} content={content} setContent={setContent} setEditCollectionsModalVisibility={setEditCollectionsModalVisibility} setOnChange={setOnChange}/>
      </div>
      {entryModalVisibility ? <AddNewEntryModal setEntryModalVisibility={setEntryModalVisibility} selectedCollection={selectedCollection} onChange={onChange} setOnChange={setOnChange}/> : null}
      {editCollectionsModalVisibility ? <EditCollectionsModal setOnChange={setOnChange} onChange={onChange} content={content} setEditCollectionsModalVisibility={setEditCollectionsModalVisibility} selectedCollection={selectedCollection} setSelectedCollection={setSelectedCollection}/> : null}
    </div>
  ) : (
    <div className="landingContainer">
      <SidePanel contentTypes={contentTypes} setCollectionVisibility={setCollectionVisibility} collectionVisibility={collectionVisibility} setSelectedCollection={setSelectedCollection}/>
      <div className="body">
        <Header heading={'Content Types'}/>
        <div className='bodyContent'>
          <ContentTypePanel contentTypes={contentTypes} setSelectedType={setSelectedType} setVisibility={setVisibility}/>
          <ContentType selectedType={selectedType} setFieldVisibility={setFieldVisibility} onChange={onChange} setOnChange={setOnChange} setSelectedType={setSelectedType} setEditTypeNameModalVisibility={setEditTypeNameModalVisibility} setField={setField} setEditFieldVisibility={setEditFieldVisibility}/>
          {visibility ? <NewTypeModal setOnChange={setOnChange} onChange={onChange} setSelectedType={setSelectedType} setVisibility={setVisibility}/> : null}
          {fieldVisibility ? <AddFieldModal setFieldVisibility={setFieldVisibility} setOnChange={setOnChange} onChange={onChange} selectedType={selectedType} setSelectedType={setSelectedType}/> : null}
          {editTypeNameModalVisibility ? <EditTypeNameModal setEditTypeNameModalVisibility={setEditTypeNameModalVisibility} selectedType={selectedType} setOnChange={setOnChange} onChange={onChange} setSelectedType={setSelectedType}/> : null}
          {editFieldVisibility ? <EditFieldModal setEditFieldVisibility={setEditFieldVisibility} setOnChange={setOnChange} onChange={onChange} selectedType={selectedType} setSelectedType={setSelectedType} field={field}/> : null}
        </div>
      </div>
    </div>
  );
}
