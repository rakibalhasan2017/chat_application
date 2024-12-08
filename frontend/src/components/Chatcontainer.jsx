import React from 'react'
import { usechatstore } from '../stores/usechatstore';
import Spinner from './Spinner';


const Chatcontainer = () => {
  const { users, selecteduser, getuser, isuserloading, setselecteduser } = usechatstore();
  console.log(selecteduser);
  return (
    <div>
      <h1>chatcontainer is selected</h1>
    </div>
  )
}

export default Chatcontainer
