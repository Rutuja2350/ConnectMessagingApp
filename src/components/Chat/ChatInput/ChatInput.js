import React, { useState } from 'react';
import { useStateValue } from '../../../StateProvider/StateProvider';
import './ChatInput.css';
import db from '../../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const ChatInput = ({ channelName, channelId }) => {

    const [input, setInput] = useState("");
    const [{ user }] = useStateValue();

    const sendMessage = async (e) => {
        e.preventDefault();  // refresh the page
        if (channelId) {
            try {
                await addDoc(collection(db, 'channels', channelId, 'messages'), {
                    message: input,
                    timestamp: serverTimestamp(),
                    user: user.displayName || "Anonymous",
                    userImage: user.photoURL,
                });
            } catch (error) {
                console.log("Error adding document: ", error);
            }
        }
    };

    return (
        <div className='chatInput'>
            <form>
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder={`Message #${channelName?.toLowerCase()}`} // here use backtik ` and not inverted comma ' 
                />
                {/* hide the button (in css file) for better UX - this is possible since ENTER works same as clicking on the button  */}
                <button type='submit' onClick={sendMessage}>
                    SEND
                </button>
            </form>
        </div>
    )
}

export default ChatInput;
