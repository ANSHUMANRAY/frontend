/* eslint-disable react/prop-types */
import React from 'react';
import './Header.css';

export default function Header(props) {
  const {heading} = props;
  console.log(heading);
  return (
    <div className="headerContainer">
      <h1>{heading}</h1>
    </div>
  );
}