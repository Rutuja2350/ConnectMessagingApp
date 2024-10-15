import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import db from '../../firebase';
import "./SidebarOption.css";

const SidebarOption = ({ Icon, title, id, addChannelOption }) => {

    const navigate = useNavigate();

    const selectChannel = () => {
        if (id) {
            navigate(`/channel/${id}`);
        } else {
            navigate(`/${title}`);
        }
    }

    const addChannel = async () => {
        const channelName = prompt('Please enter the channel name');
        if (channelName) {
            // add data in DB
            await addDoc(collection(db, 'channels'), {
                name: channelName
            });
        }
    }

    return (
        <div className='sidebarOption' onClick={addChannelOption ? addChannel : selectChannel}>
            {Icon && <Icon className="sidebarOption_icon" />}
            {Icon ? (
                <h3>{title}</h3>
            ) : (
                <h3 className='sidebarOption_channel'>
                    <span className='sidebarOption_hash'>#</span> {title}
                </h3>
            )}
        </div>
    )
}

export default SidebarOption;
