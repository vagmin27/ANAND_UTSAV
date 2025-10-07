import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import axios from 'axios';
import { io } from 'socket.io-client';
import { Send } from 'lucide-react';
import '../css/ChatPage.css';

// Configuration
const API_BASE_URL = 'https://anandnihal.onrender.com';
const SOCKET_URL = 'https://anandnihal.onrender.com/';

export default function ChatPage() {
  const { user, token } = useUser();
  const { conversationId: conversationIdFromUrl } = useParams();
  const navigate = useNavigate();
  

  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);


  const messagesEndRef = useRef(null);
  const selectedConversationRef = useRef(selectedConversation);

  useEffect(() => {
    selectedConversationRef.current = selectedConversation;
  }, [selectedConversation]);

  // MODIFIED: This useEffect now contains detailed debugging logs.
  useEffect(() => {
    console.log("ChatPage mounted."); // 1. Check if the component mounts

    if (!token) {
        console.error("NO TOKEN FOUND! User might not be logged in correctly."); // 2. Check for token
        setLoading(false); // Stop loading if there's no token
        return;
    }
    
    console.log("User Token is present:", token); // 3. Confirm token exists

    // Setup Axios Authorization Header
    const api = axios.create({
      baseURL: API_BASE_URL,
      headers: { Authorization: `Bearer ${token}` },
    });

    // Fetch all user conversations
    const getConversations = async () => {
      try {
        setLoading(true);
        console.log("Attempting to fetch conversations..."); // 4. Check if fetch function is called
        const { data } = await api.get('/convo/');
        console.log("Successfully received conversations:", data); // 5. Check the response data
        setConversations(data || []);
      } catch (error) {
        console.error("FAILED to fetch conversations:", error.response?.data || error.message); // 6. IMPORTANT: Check for errors
      } finally {
        setLoading(false);
      }
    };
    getConversations();

    // Connect to Socket.IO
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);
    newSocket.emit('setup', user);

    // Cleanup on component unmount
    return () => {
        console.log("ChatPage unmounted, disconnecting socket.");
        newSocket.disconnect();
    }
  }, [token, user]); // This dependency array is important

  // Select Conversation based on URL parameter
  useEffect(() => {
    if (conversationIdFromUrl && conversations.length > 0) {
      const conversationToSelect = conversations.find(c => c._id === conversationIdFromUrl);
      if (conversationToSelect) {
        setSelectedConversation(conversationToSelect);
      }
    }
  }, [conversationIdFromUrl, conversations]);

  // Fetch Messages & Mark as Read when a conversation is selected
  useEffect(() => {
    if (!selectedConversation || !token) return;

    const api = axios.create({ baseURL: API_BASE_URL, headers: { Authorization: `Bearer ${token}` } });
    
    const fetchMessages = async () => {
      try {
        const { data } = await api.get(`/message/${selectedConversation._id}`);
        setMessages(data || []);
        socket.emit('join conversation', selectedConversation._id);
      } catch (error) {
        console.error("Failed to fetch messages", error);
      }
    };

    const markAsRead = async () => {
        try {
            await api.put(`/convo/read/${selectedConversation._id}`);
            setConversations(prev => prev.map(c => 
                c._id === selectedConversation._id ? {...c, unreadCount: 0} : c
            ));
        } catch (error) {
            console.error("Failed to mark as read", error);
        }
    }

    fetchMessages();
    if (selectedConversation.unreadCount > 0) {
      markAsRead();
    }
  }, [selectedConversation, token, socket]);

  // Listen for incoming messages
  useEffect(() => {
    if (!socket) return;

    const messageListener = (newMessage) => {
      if (selectedConversationRef.current?._id === newMessage.conversation._id) {
        setMessages(prev => [...prev, newMessage]);
      } else {
        setConversations(prev => prev.map(convo => 
            convo._id === newMessage.conversation._id 
            ? { ...convo, latestMessage: newMessage, unreadCount: (convo.unreadCount || 0) + 1 }
            : convo
        ));
      }
    };

    socket.on('message received', messageListener);
    return () => socket.off('message received', messageListener);
  }, [socket]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    const api = axios.create({ baseURL: API_BASE_URL, headers: { Authorization: `Bearer ${token}` } });

    try {
        const payload = { content: newMessage, conversationId: selectedConversation._id };
        const { data: sentMessage } = await api.post('/message/', payload);
        
        socket.emit('new message', sentMessage);
        setMessages(prev => [...prev, sentMessage]);
        setNewMessage('');
    } catch (error) {
        console.error("Failed to send message", error);
    }
  };

  const getOtherParticipant = (convo) => {
    if (!convo || !user) return { name: "Unknown" };
    return convo.provider?._id === user._id ? convo.user : convo.provider;
  };
  
  if (loading) {
    return <div className="chat-page-loading">Loading chats...</div>;
  }

  return (
    <div className="chat-page-container">
      <div className="conversation-list-panel">
        <div className="list-header">
            <h3>Conversations</h3>
        </div>
        <div className="conversations">
          {conversations.length > 0 ? conversations.map(convo => {
            const otherUser = getOtherParticipant(convo);
            return (
              <div 
                key={convo._id} 
                className={`conversation-item ${selectedConversation?._id === convo._id ? 'active' : ''}`}
                onClick={() => navigate(`/chat/${convo._id}`)}
              >
                <div className="convo-details">
                  <p className="convo-name">{otherUser?.fullName || otherUser?.name}</p>
                  <p className="convo-preview">
                    {convo.latestMessage ? convo.latestMessage.content.substring(0, 25) + '...' : 'No messages yet'}
                  </p>
                </div>
                {convo.unreadCount > 0 && <span className="unread-badge">{convo.unreadCount}</span>}
              </div>
            )
          }) : <p className="no-convos">No conversations found.</p>}
        </div>
      </div>

      <div className="chat-box-panel">
        {selectedConversation ? (
          <>
            <div className="chat-header">
              <h3>{getOtherParticipant(selectedConversation)?.fullName || getOtherParticipant(selectedConversation)?.name}</h3>
            </div>
            <div className="messages-area">
              {messages.map(msg => (
                <div key={msg._id} className={`message-bubble ${msg.sender?._id === user?._id ? 'sent' : 'received'}`}>
                  <p>{msg.content}</p>
                  <span className="timestamp">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form className="message-input-form" onSubmit={handleSendMessage}>
              <input
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button type="submit"><Send size={20} /></button>
            </form>
          </>
        ) : (
          <div className="no-chat-selected">
            <h2>Select a conversation to start chatting</h2>
          </div>
        )}
      </div>
    </div>
  );
}