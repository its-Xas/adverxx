import React, { useState } from 'react';
import { Plus, CreditCard as Edit, Trash2, Eye, EyeOff, MessageSquare, FolderOpen, Mail, DollarSign, CheckCircle, Clock } from 'lucide-react';
import { Project, ContactMessage, CustomProjectRequest } from '../../types';
import { ProjectForm } from './ProjectForm';

interface AdminPanelProps {
  projects: Project[];
  onAddProject: (project: Omit<Project, 'id'>) => void;
  onUpdateProject: (id: string, updates: Partial<Project>) => void;
  onDeleteProject: (id: string) => void;
  contactMessages: ContactMessage[];
  customRequests: CustomProjectRequest[];
  onUpdateContactMessage: (id: string, updates: Partial<ContactMessage>) => void;
  onUpdateCustomRequest: (id: string, updates: Partial<CustomProjectRequest>) => void;
  onDeleteContactMessage: (id: string) => void;
  onDeleteCustomRequest: (id: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  projects,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
  contactMessages,
  customRequests,
  onUpdateContactMessage,
  onUpdateCustomRequest,
  onDeleteContactMessage,
  onDeleteCustomRequest,
}) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'messages' | 'requests'>('projects');
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<'all' | 'photography' | 'videography'>('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<CustomProjectRequest | null>(null);

  const filteredProjects = projects.filter(project => 
    filter === 'all' || project.category === filter
  );

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleFormSubmit = (projectData: Omit<Project, 'id'>) => {
    if (editingProject) {
      onUpdateProject(editingProject.id, projectData);
    } else {
      onAddProject(projectData);
    }
    setShowForm(false);
    setEditingProject(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  const handleDelete = (project: Project) => {
    if (window.confirm(`Are you sure you want to delete "${project.title}"?`)) {
      onDeleteProject(project.id);
    }
  };

  const handleEmailClick = (email: string, subject: string) => {
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    window.open(mailtoLink, '_blank');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread':
      case 'pending':
        return 'bg-red-100 text-red-900';
      case 'read':
      case 'reviewed':
        return 'bg-amber-100 text-amber-900';
      case 'replied':
      case 'quoted':
        return 'bg-blue-100 text-blue-900';
      case 'accepted':
        return 'bg-green-100 text-green-900';
      default:
        return 'bg-gray-100 text-gray-900';
    }
  };

  if (showForm) {
    return (
      <div className="min-h-screen bg-gray-900 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <ProjectForm
            project={editingProject}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 py-20 relative overflow-hidden">
      {/* Futuristic background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 relative z-10">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage projects, messages, and requests</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-8 relative z-10">
          <button
            onClick={() => {
              setActiveTab('projects');
              setSelectedMessage(null);
              setSelectedRequest(null);
            }}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'projects'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg'
                : 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-gray-300 hover:bg-gray-700/50 hover:border-cyan-500/30'
            }`}
          >
            <FolderOpen className="h-4 w-4" />
            Projects ({projects.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('messages');
              setSelectedRequest(null);
            }}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'messages'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg'
                : 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-gray-300 hover:bg-gray-700/50 hover:border-cyan-500/30'
            }`}
          >
            <Mail className="h-4 w-4" />
            Messages ({contactMessages.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('requests');
              setSelectedMessage(null);
            }}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'requests'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg'
                : 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-gray-300 hover:bg-gray-700/50 hover:border-cyan-500/30'
            }`}
          >
            <DollarSign className="h-4 w-4" />
            Custom Requests ({customRequests.length})
          </button>
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div className="flex flex-wrap gap-4">
                {[
                  { key: 'all', label: 'All Projects' },
                  { key: 'photography', label: 'Photography' },
                  { key: 'videography', label: 'Videography' },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setFilter(key as any)}
                    className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                      filter === key
                        ? 'border-gray-900 text-gray-900'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {label} ({projects.filter(p => key === 'all' || p.category === key).length})
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="mt-4 sm:mt-0 px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                <Plus className="h-5 w-5" />
                Add Project
              </button>
            </div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group"
            >
              {/* Image */}
              <div className="relative h-48">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    project.category === 'photography'
                      ? 'bg-blue-100 text-blue-900'
                      : 'bg-red-100 text-red-900'
                  }`}>
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="px-2 py-1 text-xs font-medium rounded bg-amber-100 text-amber-900">
                      Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {new Date(project.date).toLocaleDateString()}
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onUpdateProject(project.id, { featured: !project.featured })}
                      className={`p-2 rounded transition-colors ${
                        project.featured
                          ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      title={project.featured ? 'Remove from featured' : 'Add to featured'}
                    >
                      {project.featured ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => handleEdit(project)}
                      className="p-2 bg-blue-100 text-blue-900 rounded hover:bg-blue-200 transition-colors"
                      title="Edit project"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(project)}
                      className="p-2 bg-red-100 text-red-900 rounded hover:bg-red-200 transition-colors"
                      title="Delete project"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-600 text-lg mb-4">No projects found for the selected filter.</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Add Your First Project
                </button>
              </div>
            )}
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Messages List */}
            <div className="lg:col-span-1 space-y-4 max-h-[700px] overflow-y-auto">
              {contactMessages.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No contact messages yet</p>
                </div>
              ) : (
                contactMessages.map((message) => (
                  <button
                    key={message.id}
                    onClick={() => {
                      setSelectedMessage(message);
                      if (message.status === 'unread') {
                        onUpdateContactMessage(message.id, { status: 'read' });
                      }
                    }}
                    className={`w-full text-left p-4 bg-white border border-gray-200 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedMessage?.id === message.id ? 'border-gray-900 shadow-md' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900 truncate">{message.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded ${getStatusColor(message.status)}`}>
                        {message.status}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{message.email}</p>
                    <p className="text-gray-700 text-sm line-clamp-2">{message.message}</p>
                    <p className="text-gray-500 text-xs mt-2">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </p>
                  </button>
                ))
              )}
            </div>

            {/* Message Detail */}
            <div className="lg:col-span-2">
              {selectedMessage ? (
                <div className="bg-white border border-gray-200 rounded-lg p-6 max-h-[700px] overflow-y-auto">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-900 mb-2">{selectedMessage.name}</h2>
                      <p className="text-gray-600">{selectedMessage.email}</p>
                      <p className="text-gray-500 text-sm">
                        {new Date(selectedMessage.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => onDeleteContactMessage(selectedMessage.id)}
                      className="p-2 bg-red-100 text-red-900 rounded hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">Project Type</label>
                      <p className="text-gray-700 bg-gray-50 p-3 rounded">{selectedMessage.projectType}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">Message</label>
                      <p className="text-gray-700 bg-gray-50 p-4 rounded leading-relaxed whitespace-pre-wrap break-words">{selectedMessage.message}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">Status</label>
                      <select
                        value={selectedMessage.status}
                        onChange={(e) => onUpdateContactMessage(selectedMessage.id, { status: e.target.value as any })}
                        className="bg-white border border-gray-300 text-gray-900 rounded-lg px-3 py-2 w-full"
                      >
                        <option value="unread">Unread</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                      </select>
                    </div>

                    <button
                      onClick={() => handleEmailClick(
                        selectedMessage.email,
                        `Re: Your inquiry about ${selectedMessage.projectType}`
                      )}
                      className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <Mail className="h-4 w-4" />
                      Reply to {selectedMessage.name}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-gray-200 rounded-lg p-6 text-center h-full flex items-center justify-center">
                  <div>
                    <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Select a message to view details</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Custom Requests Tab */}
        {activeTab === 'requests' && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Requests List */}
            <div className="lg:col-span-1 space-y-4 max-h-[700px] overflow-y-auto">
              {customRequests.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No custom requests yet</p>
                </div>
              ) : (
                customRequests.map((request) => (
                  <button
                    key={request.id}
                    onClick={() => {
                      setSelectedRequest(request);
                      if (request.status === 'pending') {
                        onUpdateCustomRequest(request.id, { status: 'reviewed' });
                      }
                    }}
                    className={`w-full text-left p-4 bg-white border border-gray-200 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedRequest?.id === request.id ? 'border-gray-900 shadow-md' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900 truncate">{request.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{request.email}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span>{request.projectDuration} days</span>
                      <span>${request.estimatedPrice.toLocaleString()}</span>
                    </div>
                    <p className="text-gray-500 text-xs mt-2">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                  </button>
                ))
              )}
            </div>

            {/* Request Detail */}
            <div className="lg:col-span-2">
              {selectedRequest ? (
                <div className="bg-white border border-gray-200 rounded-lg p-6 max-h-[700px] overflow-y-auto">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-900 mb-2">{selectedRequest.name}</h2>
                      <p className="text-gray-600">{selectedRequest.email}</p>
                      {selectedRequest.phone && (
                        <p className="text-gray-600">{selectedRequest.phone}</p>
                      )}
                      <p className="text-gray-500 text-sm">
                        {new Date(selectedRequest.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => onDeleteCustomRequest(selectedRequest.id)}
                      className="p-2 bg-red-100 text-red-900 rounded hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Project Duration</label>
                        <p className="text-gray-700 bg-gray-50 p-3 rounded">{selectedRequest.projectDuration} days</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Quality Level</label>
                        <p className="text-gray-700 bg-gray-50 p-3 rounded capitalize">{selectedRequest.qualityLevel}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Additional Cameras</label>
                        <p className="text-gray-700 bg-gray-50 p-3 rounded">{selectedRequest.additionalCameras}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Estimated Price</label>
                        <p className="text-2xl font-bold text-green-700 bg-green-50 p-3 rounded">
                          ${selectedRequest.estimatedPrice.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Equipment Required</label>
                        <div className="bg-gray-50 p-3 rounded space-y-2">
                          {selectedRequest.soundEquipment && <p className="text-gray-700 text-sm">✓ Professional Audio</p>}
                          {selectedRequest.stabilizers && <p className="text-gray-700 text-sm">✓ Camera Stabilizers</p>}
                          {selectedRequest.lighting && <p className="text-gray-700 text-sm">✓ Professional Lighting</p>}
                          {selectedRequest.drones && <p className="text-gray-700 text-sm">✓ Drone Footage</p>}
                          {!selectedRequest.soundEquipment && !selectedRequest.stabilizers && !selectedRequest.lighting && !selectedRequest.drones && (
                            <p className="text-gray-600 text-sm">No additional equipment</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Services</label>
                        <div className="bg-gray-50 p-3 rounded">
                          {selectedRequest.services.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {selectedRequest.services.map((service) => (
                                <span key={service} className="px-2 py-1 bg-blue-100 text-blue-900 text-xs rounded">
                                  {service}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-600 text-sm">No services selected</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Status</label>
                        <select
                          value={selectedRequest.status}
                          onChange={(e) => onUpdateCustomRequest(selectedRequest.id, { status: e.target.value as any })}
                          className="bg-white border border-gray-300 text-gray-900 rounded-lg px-3 py-2 w-full"
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
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-900 mb-2">Project Description</label>
                      <p className="text-gray-700 bg-gray-50 p-4 rounded leading-relaxed whitespace-pre-wrap break-words">{selectedRequest.message}</p>
                    </div>
                  )}

                  <button
                    onClick={() => handleEmailClick(
                      selectedRequest.email,
                      `Custom Project Quote - ${selectedRequest.name}`
                    )}
                    className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    Send Quote to {selectedRequest.name}
                  </button>
                </div>
              ) : (
                <div className="bg-white border border-gray-200 rounded-lg p-6 h-full flex items-center justify-center">
                  <div className="text-center">
                    <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Select a request to view details</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};