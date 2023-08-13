import React from 'react'
import './InteractiveSideBar.css';

const InteractiveSideBar = ({ details }) => {
  const {city, country, state} = details;
   
    return (
      <div className='sidebar'>
       <h3>selected</h3>
          <ul>
           { country && <li>Country: {country}</li> }
          { city && <li>City: {city}</li> }
         { state && <li>State/Province: {state}</li> }
          </ul>
    
      </div>
    )
  }

export default InteractiveSideBar