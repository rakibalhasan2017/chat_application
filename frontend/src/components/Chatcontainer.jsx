import React, { useEffect } from 'react'
import { usechatstore } from '../stores/usechatstore';
import Spinner from './Spinner';
import Chatheader from './Chatheader';
import Chatinput from './Chatinput';


const Chatcontainer = () => {
  const {messages, getmessage, selecteduser, ismesageloading } = usechatstore();

  useEffect(() => {
    if(selecteduser){
      getmessage(selecteduser._id);
    }
  }, [selecteduser])

  if(ismesageloading){
    return <Spinner/>
  }

  return (
    <div>
      <Chatheader/>
      <p>this is the message section</p>
      <Chatinput/>
    </div>
  )
}

export default Chatcontainer
