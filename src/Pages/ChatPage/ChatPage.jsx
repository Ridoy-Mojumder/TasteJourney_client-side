import { useState, useEffect } from 'react';
import axios from 'axios';

const ChatPage = () => {
    const [chats, setChats] = useState([]);

    
    const fetchChats = async () => {
        try {
            const response = await axios.get('http://localhost:5000/chats');
            setChats(response.data);
        } catch (error) {
            console.error('Error fetching chat data:', error);
        }
    };

    useEffect(() => {

        fetchChats(); 
    }, []); 

    return (
        <div>
            <h1 className="text-3xl">Chat Page</h1>
            <div>
                {/* Render the fetched chat data */}
                {chats.map((chat, index) => (
                    <div key={index}>
                        <h2>{chat.chatName}</h2>
                        {/* Render other chat details as needed */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatPage;
