import React from 'react';
import './Landing.css';
import SidePanel from '../../components/SidePanel';
import axios from 'axios';
import ContentTypePanel from '../../components/ContentTypePanel';

export default function Landing() {
  const [contentTypes, setContentTypes] = React.useState([]);
  const [selectedType, setSelectedType] = React.useState({});
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }
    axios.get('http://localhost:8080/contentTypes', { headers: { Authorization: token } })
      .then((response) => {
        setContentTypes(response.data);
        // selectedType(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(selectedType);
  return (
    <div className="landingContainer">
      <SidePanel contentTypes={contentTypes} setSelectedType={setSelectedType} />
      <ContentTypePanel contentTypes={contentTypes}/>
    </div>
  );
}