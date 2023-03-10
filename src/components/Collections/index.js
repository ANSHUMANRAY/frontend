/* eslint-disable react/prop-types */
import React from 'react';
import './Collections.css';
import axios from 'axios';
import editImage from '../../assets/editImage.png';
import deleteImage from '../../assets/deleteImage.png';
import { useNavigate } from 'react-router-dom';

export default function Collections(props) {
  const navigate = useNavigate();
  const { selectedCollection , setEntryModalVisibility, onChange, setContent, setEditCollectionsModalVisibility, setOnChange} = props;
  const [collection, setCollection] = React.useState([]);
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token){
      navigate('/login');
    }
    axios.get(`http://localhost:8080/collections/${selectedCollection.id}`, { headers: { Authorization: `${token}`}})
      .then((res) => {
        setCollection(res.data);
        console.log(res.data);
      }).catch((err) => {
        if(err.response.status === 401){
          navigate('/login');
          alert('Please login again');
        }
        console.log(err);
      });
  }, [selectedCollection, onChange]);
  const handleEdit = (content) => {
    setContent(content);
    setEditCollectionsModalVisibility(true);
  };
  const handleDelete = (id) => {
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:8080/collections/${id}`, { headers: { Authorization: `${token}`}})
      .then((res) => {
        console.log(res.data);
        setOnChange(!onChange);
      }) .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="collectionsContainer">
      <div className="collectionHeader">
        <h1>{collection.length} Entries Found</h1>
        <h1 onClick={()=>{setEntryModalVisibility(true);}}>Add new entry</h1>
      </div>
      <table className="collectionBody">
        <thead>
          <tr className="collectionBodyHeader">
            <th>
              <h1>Id</h1>
            </th>
            {selectedCollection.fields.map((field, index) => {
              return (
                <th key={index} className="collectionBodyHeaderItem">
                  <h1>{field}</h1>
                </th>
              );
            })}
            <th>
              <h1>Actions</h1>
            </th>
          </tr>
        </thead>
        {/* <table className="collectionBodyContent"> */}
        {collection.map((entry, index) => {
          return (
            <tbody key={index}>
              <tr  className="collectionBodyContentItem">
                <td>
                  <h1>{entry.id}</h1>
                </td>
                {selectedCollection.fields.map((item) => {
                  return (
                    <td key={item}>
                      <h1 >{entry.entry[item]}</h1>
                    </td>
                  );
                })}
                <td>
                  <div className="collectionBodyContentItemActions">
                    <img onClick={()=>handleEdit(entry)} src={editImage} alt="edit" />
                    <img onClick={()=>handleDelete(entry.id)} src={deleteImage} alt="delete" />
                  </div>
                </td>
              </tr>
            </tbody>
          );
        })}
        {/* </table> */}
      </table>
    </div>
  );
}