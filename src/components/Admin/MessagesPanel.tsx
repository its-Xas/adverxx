import React, { useState } from 'react';
import { Mail, Phone, Calendar, DollarSign, Eye, Trash2, CheckCircle, Clock, MessageSquare } from 'lucide-react';
import { ContactMessage, CustomProjectRequest } from '../../types';

interface MessagesPanelProps {
  contactMessages: ContactMessage[];
  customRequests: CustomProjectRequest[];
  onUpdateContactMessage: (id: string, updates: Partial<ContactMessage>) => void;
  onUpdateCustomRequest: (id: string, updates: Partial<CustomProjectRequest>) => void;
  onDeleteContactMessage: (id: string) => void;
  onDeleteCustomRequest: (id: string) => void;
}

export const MessagesPanel: React.FC<MessagesPanelProps> = ({
  contactMessages,
  customRequests,
  onUpdateContactMessage,
  onUpdateCustomRequest,
  onDeleteContactMessage,
  onDeleteCustomRequest,
}) => {
  const [activeTab, setActiveTab] = useState<'contact' | 'custom'>('contact');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<CustomProjectRequest | null>(null);

  const handleEmailClick = (email: string, subject: string) => {
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    window.open(mailtoLink, '_blank');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread':
      case 'pending':
        return 'bg-red-100 text-red-800';
      case 'read':
      case 'reviewed':
        return 'bg-yellow-100 text-yellow-800';
      case 'replied':
      case 'quoted':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent mb-2">
            Messages & Requests
          </h1>
          <p className="text-gray-400">Manage contact messages and custom project requests</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'contact'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg'
                : 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-gray-300 hover:bg-gray-700/50'
            }`}
          >
            Contact Messages ({contactMessages.length})
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'custom'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg'
                : 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-gray-300 hover:bg-gray-700/50'
            }`}
          >
            Custom Requests ({customRequests.length})
          </button>
        </div>

        {/* Contact Messages Tab */}
        {activeTab === 'contact' && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Messages List */}
            <div className="lg:col-span-1 space-y-4">
              {contactMessages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => {
                    setSelectedMessage(message);
                    if (message.status === 'unread') {
                      onUpdateContactMessage(message.id, { status: 'read' });
                    }
                  }}
                  className={`p-4 bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl cursor-pointer transition-all hover:border-cyan-500/30 ${
                    selectedMessage?.id === message.id ? 'border-cyan-500/50 bg-gray-700/50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-white truncate">{message.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(message.status)}`}>
                      {message.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{message.email}</p>
                  <p className="text-gray-300 text-sm line-clamp-2">{message.message}</p>
                  <p className="text-gray-500 text-xs mt-2">
                    {new Date(message.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
              
              {contactMessages.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No contact messages yet</p>
                </div>
              )}
            </div>

            {/* Message Detail */}
            <div className="lg:col-span-2">
              {selectedMessage ? (
                <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">{selectedMessage.name}</h2>
                      <p className="text-gray-400">{selectedMessage.email}</p>
                      <p className="text-gray-500 text-sm">
                        {new Date(selectedMessage.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEmailClick(
                          selectedMessage.email,
                          `Re: Your inquiry about ${selectedMessage.projectType}`
                        )}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg flex items-center gap-2"
                      >
                        <Mail className="h-4 w-4" />
                        Reply
                      </button>
                      <button
                        onClick={() => onDeleteContactMessage(selectedMessage.id)}
                        className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Project Type</label>
                      <p className="text-white bg-gray-700/50 p-3 rounded-lg">{selectedMessage.projectType}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                      <p className="text-white bg-gray-700/50 p-4 rounded-lg leading-relaxed">{selectedMessage.message}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                      <select
                        value={selectedMessage.status}
                        onChange={(e) => onUpdateContactMessage(selectedMessage.id, { status: e.target.value as any })}
                        className="bg-gray-700/50 border border-gray-600/50 text-white rounded-lg px-3 py-2"
                      >
                        <option value="unread">Unread</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 text-center">
                  <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Select a message to view details</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Custom Requests Tab */}
        {activeTab === 'custom' && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Requests List */}
            <div className="lg:col-span-1 space-y-4">
              {customRequests.map((request) => (
                <div
                  key={request.id}
                  onClick={() => {
                    setSelectedRequest(request);
                    if (request.status === 'pending') {
                      onUpdateCustomRequest(request.id, { status: 'reviewed' });
                    }
                  }}
                  className={`p-4 bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl cursor-pointer transition-all hover:border-cyan-500/30 ${
                    selectedRequest?.id === request.id ? 'border-cyan-500/50 bg-gray-700/50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-white truncate">{request.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{request.email}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{request.projectDuration} days</span>
                    <span>${request.estimatedPrice.toLocaleString()}</span>
                  </div>
                  <p className="text-gray-500 text-xs mt-2">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
              
              {customRequests.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No custom requests yet</p>
                </div>
              )}
            </div>

            {/* Request Detail */}
            <div className="lg:col-span-2">
              {selectedRequest ? (
                <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">{selectedRequest.name}</h2>
                      <p className="text-gray-400">{selectedRequest.email}</p>
                      {selectedRequest.phone && (
                        <p className="text-gray-400">{selectedRequest.phone}</p>
                      )}
                      <p className="text-gray-500 text-sm">
                        {new Date(selectedRequest.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEmailClick(
                          selectedRequest.email,
                          `Custom Project Quote - ${selectedRequest.name}`
                        )}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg flex items-center gap-2"
                      >
                        <Mail className="h-4 w-4" />
                        Send Quote
                      </button>
                      <button
                        onClick={() => onDeleteCustomRequest(selectedRequest.id)}
                        className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Project Duration</label>
                        <p className="text-white bg-gray-700/50 p-3 rounded-lg">{selectedRequest.projectDuration} days</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Quality Level</label>
                        <p className="text-white bg-gray-700/50 p-3 rounded-lg capitalize">{selectedRequest.qualityLevel}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Additional Cameras</label>
                        <p className="text-white bg-gray-700/50 p-3 rounded-lg">{selectedRequest.additionalCameras}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Estimated Price</label>
                        <p className="text-2xl font-bold text-green-400 bg-gray-700/50 p-3 rounded-lg">
                          ${selectedRequest.estimatedPrice.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Equipment Required</label>
                        <div className="bg-gray-700/50 p-3 rounded-lg space-y-2">
                          {selectedRequest.soundEquipment && <p className="text-white text-sm">✓ Professional Audio</p>}
                          {selectedRequest.stabilizers && <p className="text-white text-sm">✓ Camera Stabilizers</p>}
                          {selectedRequest.lighting && <p className="text-white text-sm">✓ Professional Lighting</p>}
                          {selectedRequest.drones && <p className="text-white text-sm">✓ Drone Footage</p>}
                          {!selectedRequest.soundEquipment && !selectedRequest.stabilizers && !selectedRequest.lighting && !selectedRequest.drones && (
                            <p className="text-gray-400 text-sm">No additional equipment</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Services</label>
                        <div className="bg-gray-700/50 p-3 rounded-lg">
                          {selectedRequest.services.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {selectedRequest.services.map((service) => (
                                <span key={service} className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded">
                                  {service}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-400 text-sm">No services selected</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                        <select
                          value={selectedRequest.status}
                          onChange={(e) => onUpdateCustomRequest(selectedRequest.id, { status: e.target.value as any })}
                          className="bg-gray-700/50 border border-gray-600/50 text-white rounded-lg px-3 py-2 w-full"
                        >
                          <option value="pending">Pending</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="quoted">Quoted</option>
                          <option value="accepted">Accepted</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {selectedRequest.message && (
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Project Description</label>
                      <p className="text-white bg-gray-700/50 p-4 rounded-lg leading-relaxed">{selectedRequest.message}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 text-center">
                  <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Select a request to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};