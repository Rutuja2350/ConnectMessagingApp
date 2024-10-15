import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorder';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { doc, onSnapshot, collection, query, orderBy } from 'firebase/firestore';
import db from '../../firebase';
import Messages from '../Messages/Messages';
import ChatInput from './ChatInput/ChatInput';
import './Chat.css';

const Chat = () => {

    // get id from current URL using useParams()
    const { channelId } = useParams();
    const [channelDetails, setChannelDetails] = useState(null);
    const [channelMessages, setChannelMessages] = useState([]);

    // fetch channel details
    useEffect(() => {
        if (channelId) {

            // fetch details
            const details = doc(db, 'channels', channelId);  // Reference to the document
            onSnapshot(details, (snapshot) => {
                setChannelDetails(snapshot.data());  // Set channel details with data
            });

            // fetch messages
            const messagesCollectionRef = collection(db, 'channels', channelId, 'messages'); // Get reference to the 'messages' subcollection within the 'channels' document
            const messageQuery = query(messagesCollectionRef, orderBy('timestamp', 'asc')); // Create a query to order the messages by 'timestamp' in ascending order

            // Listen for real-time updates using onSnapshot
            onSnapshot(messageQuery, (snapshot) => {
                setChannelMessages(snapshot.docs.map((doc) => doc.data())); // Update the channel messages state
            });

        }
    }, [channelId]);

    return (
        <div className='chat'>
            <div className='chat_header'>
                <div className='chat_headerLeft'>
                    <h4 className='chat_channelName'>
                        <strong>#{channelDetails?.name}</strong>
                        <StarBorderOutlinedIcon />
                    </h4>
                </div>
                <div className='chat_headerRight'>
                    <p>
                        <InfoOutlinedIcon /> Details
                    </p>
                </div>
            </div>
            <div className='chat_messages'>
                {channelMessages.map(({ message, timestamp, user, userImage }) => (
                    <>
                        <Messages
                            message={message}
                            timestamp={timestamp}
                            user={user}
                            userImage={userImage}
                        />
                    </>
                ))}
            </div>
            <ChatInput channelName={channelDetails?.name} channelId={channelId} />
        </div>
    )
}

export default Chat;
