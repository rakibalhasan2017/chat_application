import React from 'react';
import { usechatstore } from '../stores/usechatstore';
import Spinner from './Spinner';
import './Chatheader.css'; // Import the CSS file

const Chatheader = () => {
    const { selecteduser, isuserloading } = usechatstore();

    if (isuserloading) {
        return <Spinner />;
    }

    return (
        <div className="chatheader-container">
            {selecteduser && (
                <div className="chatheader">
                    <img
                        src={selecteduser.profilepic || '/avatar.png'} // Default avatar if no profile pic
                        alt={`${selecteduser.fullname}'s profile`}
                        className="chatheader-profilepic"
                    />
                    <h2 className="chatheader-fullname">{selecteduser.fullname}</h2>
                </div>
            )}
        </div>
    );
};

export default Chatheader;
