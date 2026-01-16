import { useState, useRef } from 'react';
import { Upload, File, X } from 'lucide-react';
import './StatementUploader.css';

export function StatementUploader({ onFilesSelected }) {
    const [files, setFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(Array.from(e.dataTransfer.files));
    };

    const handleFiles = (newFiles) => {
        const validFiles = newFiles.filter(file =>
            file.name.endsWith('.csv') ||
            file.name.endsWith('.pdf') ||
            file.type === 'text/csv' ||
            file.type === 'application/pdf'
        );

        const updatedFiles = [...files, ...validFiles];
        setFiles(updatedFiles);
        if (onFilesSelected) {
            onFilesSelected(updatedFiles);
        }
    };

    const removeFile = (index) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles);
        if (onFilesSelected) {
            onFilesSelected(updatedFiles);
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / 1048576).toFixed(1) + ' MB';
    };

    return (
        <div className="uploader-container">
            <div
                className={`drop-zone ${isDragging ? 'dragging' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <div className="drop-icon">
                    <Upload size={24} />
                </div>
                <p className="drop-title">Drop your bank statements</p>
                <p className="drop-subtitle">or click to browse • CSV files supported</p>

                <span className="browse-btn">Browse Files</span>

                <p className="privacy-note">
                    <span>●</span> 100% client-side processing • Your data never leaves your browser
                </p>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => handleFiles(Array.from(e.target.files))}
                    accept=".csv,.pdf"
                    multiple
                    hidden
                />
            </div>

            {files.length > 0 && (
                <div className="file-list">
                    {files.map((file, index) => (
                        <div key={index} className="file-item">
                            <div className="file-info">
                                <File size={20} className="file-icon" />
                                <div>
                                    <span className="file-name">{file.name}</span>
                                    <span className="file-size">{formatFileSize(file.size)}</span>
                                </div>
                            </div>
                            <button
                                className="remove-btn"
                                onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                            >
                                <X size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
