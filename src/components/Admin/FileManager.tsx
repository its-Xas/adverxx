import React, { useState, useRef } from 'react';
import { Upload, Image, Trash2, Download, Eye, FolderOpen } from 'lucide-react';

export const FileManager: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (selectedFiles.length === 0) return;

    setUploading(true);
    
    // Simulate file upload process
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setFiles(prev => [...prev, ...selectedFiles]);
    setUploading(false);
    
    // Clear the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDelete = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const isImage = (file: File) => {
    return file.type.startsWith('image/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent mb-2">
            File Manager
          </h1>
          <p className="text-gray-400">Upload and manage media files for your projects</p>
        </div>

        {/* Upload Area */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-8 mb-8">
          <div className="text-center">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer inline-flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-600 rounded-lg hover:border-cyan-500/50 transition-colors"
            >
              <Upload className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-white font-medium mb-2">Click to upload files</p>
              <p className="text-gray-400 text-sm">Support for images and videos</p>
            </label>
          </div>
          
          {uploading && (
            <div className="mt-4 text-center">
              <div className="inline-flex items-center gap-2 text-cyan-400">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cyan-400"></div>
                Uploading files...
              </div>
            </div>
          )}
        </div>

        {/* Files Grid */}
        {files.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {files.map((file, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl overflow-hidden shadow-2xl hover:border-cyan-500/30 transition-all duration-300"
              >
                {/* File Preview */}
                <div className="relative h-48 bg-gray-700/50 flex items-center justify-center">
                  {isImage(file) ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-400 text-sm">{file.type}</p>
                    </div>
                  )}
                </div>

                {/* File Info */}
                <div className="p-4">
                  <h3 className="text-white font-medium mb-2 truncate" title={file.name}>
                    {file.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {formatFileSize(file.size)}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {isImage(file) && (
                      <button
                        onClick={() => {
                          const url = URL.createObjectURL(file);
                          window.open(url, '_blank');
                        }}
                        className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg text-sm flex items-center justify-center gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </button>
                    )}
                    <button
                      onClick={() => {
                        const url = URL.createObjectURL(file);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = file.name;
                        a.click();
                      }}
                      className="flex-1 px-3 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg text-sm flex items-center justify-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Image className="h-16 w-16 text-gray-400 mx-auto mb-4 opacity-50" />
            <p className="text-gray-400 text-lg mb-2">No files uploaded yet</p>
            <p className="text-gray-500">Upload your first media file to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};