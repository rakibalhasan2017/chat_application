import React, { useEffect } from 'react'
import { usechatstore } from '../stores/usechatstore';
import Spinner from './Spinner';
import Chatheader from './Chatheader.jsx';
import Chatinput from './Chatinput.jsx';


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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Chatheader />
      <div style={{ flex: 1, padding: '10px' }}>
        <p>this is the message section</p>
      </div>
      <div style={{ borderTop: '1px solid #ccc', padding: '10px' }}>
        <Chatinput />
      </div>
    </div>
  )
}

export default Chatcontainer
