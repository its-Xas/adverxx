import { useState, useEffect } from 'react';
import { ContactMessage, CustomProjectRequest } from '../types';

export const useMessages = () => {
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [customRequests, setCustomRequests] = useState<CustomProjectRequest[]>([]);

  useEffect(() => {
    // Load messages from localStorage
    const storedMessages = localStorage.getItem('adverx-contact-messages');
    const storedRequests = localStorage.getItem('adverx-custom-requests');
    
    if (storedMessages) {
      setContactMessages(JSON.parse(storedMessages));
    }
    
    if (storedRequests) {
      setCustomRequests(JSON.parse(storedRequests));
    }
  }, []);

  const saveContactMessages = (messages: ContactMessage[]) => {
    setContactMessages(messages);
    localStorage.setItem('adverx-contact-messages', JSON.stringify(messages));
  };

  const saveCustomRequests = (requests: CustomProjectRequest[]) => {
    setCustomRequests(requests);
    localStorage.setItem('adverx-custom-requests', JSON.stringify(requests));
  };

  const addContactMessage = (message: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>) => {
    const newMessage: ContactMessage = {
      ...message,
      id: Date.now().toString(),
      status: 'unread',
      createdAt: new Date().toISOString(),
    };
    const newMessages = [newMessage, ...contactMessages];
    saveContactMessages(newMessages);
    return newMessage.id;
  };

  const addCustomRequest = (request: Omit<CustomProjectRequest, 'id' | 'status' | 'createdAt'>) => {
    const newRequest: CustomProjectRequest = {
      ...request,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    const newRequests = [newRequest, ...customRequests];
    saveCustomRequests(newRequests);
    return newRequest.id;
  };

  const updateContactMessage = (id: string, updates: Partial<ContactMessage>) => {
    const newMessages = contactMessages.map(msg =>
      msg.id === id ? { ...msg, ...updates } : msg
    );
    saveContactMessages(newMessages);
  };

  const updateCustomRequest = (id: string, updates: Partial<CustomProjectRequest>) => {
    const newRequests = customRequests.map(req =>
      req.id === id ? { ...req, ...updates } : req
    );
    saveCustomRequests(newRequests);
  };

  const deleteContactMessage = (id: string) => {
    const newMessages = contactMessages.filter(msg => msg.id !== id);
    saveContactMessages(newMessages);
  };

  const deleteCustomRequest = (id: string) => {
    const newRequests = customRequests.filter(req => req.id !== id);
    saveCustomRequests(newRequests);
  };

  return {
    contactMessages,
    customRequests,
    addContactMessage,
    addCustomRequest,
    updateContactMessage,
    updateCustomRequest,
    deleteContactMessage,
    deleteCustomRequest,
  };
};