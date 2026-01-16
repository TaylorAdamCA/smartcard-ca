import { useState, useRef } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import './StatementUploader.css';

export function StatementUploader({ onFilesSelected }) {
    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState([]);
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

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(Array.from(e.dataTransfer.files));
        }
    };

    const handleFileInput = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFiles(Array.from(e.target.files));
        }
    };

    const handleFiles = (newFiles) => {
        const validFiles = newFiles.filter(file =>
            file.type === 'application/pdf' ||
            file.type === 'text/csv' ||
            file.name.endsWith('.csv')
        );

        const updatedFiles = [...files, ...validFiles];
        setFiles(updatedFiles);

        if (onFilesSelected) {
            onFilesSelected(updatedFiles);
        }
    };

    const removeFile = (indexToRemove) => {
        const updatedFiles = files.filter((_, index) => index !== indexToRemove);
        setFiles(updatedFiles);
        if (onFilesSelected) {
            onFilesSelected(updatedFiles);
        }
    };

    return (
        <div className="uploader-container">
            <div
                className={`drop-zone ${isDragging ? 'active' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileInput}
                    multiple
                    accept=".pdf,.csv"
                    style={{ display: 'none' }}
                />

                <div className="drop-zone-content">
                    <div className="icon-wrapper">
                        <Upload size={32} />
                    </div>
                    <h3>Drag & Drop Statements</h3>
                    <p>Support for PDF and CSV files from major banks</p>
                    <button className="btn-secondary">Browse Files</button>
                </div>
            </div>

            {files.length > 0 && (
                <div className="file-list">
                    <h4>Uploaded Files ({files.length})</h4>
                    <div className="files-grid">
                        {files.map((file, index) => (
                            <div key={index} className="file-item">
                                <FileText size={20} className="file-icon" />
                                <span className="file-name">{file.name}</span>
                                <button
                                    className="remove-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFile(index);
                                    }}
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
