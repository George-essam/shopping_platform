import React, {Fragment} from 'react'
import Records from '../data/records.json';
import { STATUS } from './status.js';
import {Link, useNavigate} from 'react-router-dom';
import { Button } from 'react-bootstrap';

function Profile(){ 
    const navigate = useNavigate()
    if (STATUS.isLogged == false) {
        return <div>You must be logged in to view this page.
            <Button variant= "link" onClick={()=>navigate('/login')}> Login Here</Button>
        </div>;
      }
  return (
    <div className='profile-details'>
        {
      Records.map( record => {
        return(
            <div className='box'>
               <strong> <label>Profile Info </label></strong> <br />
               <label>Name: </label>    {record.name}<br />
               <label>Telephone: </label> {record.telephone}<br />
               <label>Email: </label>   {record.email}<br />
               <label>City: </label>    {record.city}<br />
               <label>Address: </label> {record.address}<br />
            </div>
        )
      })
    }
    </div>
  )
}

export default Profile