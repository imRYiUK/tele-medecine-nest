# Medical Image Workflow Documentation

## Overview

This document describes the improved medical image workflow that separates DICOM file upload from metadata registration, providing better scalability, reliability, and maintainability.

## Architecture

### 1. **DICOM Upload Endpoint**
- **Purpose**: Upload DICOM files to Orthanc PACS
- **Endpoint**: `POST /dicom/upload`
- **Input**: Binary DICOM file
- **Output**: Orthanc metadata (IDs, UIDs, etc.) + acquisition date and modality

### 2. **Image Metadata Registration Endpoint**
- **Purpose**: Register image metadata and link to medical exam
- **Endpoint**: `POST /examens-medicaux/images`
- **Input**: Image metadata + exam ID + Orthanc instance ID
- **Output**: Registered image with URL and preview access

## Database Schema

### ImageMedicale Table
```sql
CREATE TABLE images_medicales (
  imageID VARCHAR(36) PRIMARY KEY,
  examenID VARCHAR(36) NOT NULL,
  studyInstanceUID VARCHAR(255) NOT NULL,
  seriesInstanceUID VARCHAR(255) NOT NULL,
  sopInstanceUID VARCHAR(255) NOT NULL,
  dateAcquisition DATETIME NOT NULL,
  modalite VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  url VARCHAR(500) NULL,                    -- Direct access URL
  orthancInstanceId VARCHAR(255) NULL,      -- NEW: Orthanc instance ID for previews
  FOREIGN KEY (examenID) REFERENCES examens_medicaux(examenID)
);
```

## API Endpoints

### 1. Upload DICOM File
```http
POST /dicom/upload
Content-Type: multipart/form-data
Authorization: Bearer <token>

Body:
- file: <binary DICOM file>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "ID": "2991c996-62ba403e-96d27bfe-33d472ee-f2b96e17",
    "ParentPatient": "7f2f5eb7-60b1e33d-83e95e58-eedb2c6a-8e77a50a",
    "ParentSeries": "e3f468dc-713cf9f4-dfc0d425-15fb9009-3cd1f75b",
    "ParentStudy": "13cb731b-00554b0d-64c4df85-387993ed-132941b5",
    "Path": "/instances/2991c996-62ba403e-96d27bfe-33d472ee-f2b96e17",
    "Status": "AlreadyStored",
    "acquisitionDate": "1996-03-08T00:00:00.000Z",
    "modality": "CT"
  }
}
```

### 2. Register Image Metadata
```http
POST /examens-medicaux/images
Content-Type: application/json
Authorization: Bearer <token>

Body:
{
  "examenID": "c627b932-4370-4123-bad4-a81be00dad8d",
  "studyInstanceUID": "1.2.840.113619.2.15.1008000062035011254.825190719.2.31",
  "seriesInstanceUID": "1.2.840.113619.2.15.1008000062035011254.825190719.1.31",
  "sopInstanceUID": "1.2.840.113619.2.15.1008000062035011254.825190719.0.31.2.1",
  "dateAcquisition": "1996-03-08T00:00:00.000Z",
  "modalite": "CT",
  "description": "Chest CT scan",
  "url": "/dicom/wado/1.2.840.113619.2.15.1008000062035011254.825190719.0.31.2.1",
  "orthancInstanceId": "2991c996-62ba403e-96d27bfe-33d472ee-f2b96e17"
}
```

**Response:**
```json
{
  "imageID": "123e4567-e89b-12d3-a456-426614174000",
  "examenID": "c627b932-4370-4123-bad4-a81be00dad8d",
  "studyInstanceUID": "1.2.840.113619.2.15.1008000062035011254.825190719.2.31",
  "seriesInstanceUID": "1.2.840.113619.2.15.1008000062035011254.825190719.1.31",
  "sopInstanceUID": "1.2.840.113619.2.15.1008000062035011254.825190719.0.31.2.1",
  "dateAcquisition": "1996-03-08T00:00:00.000Z",
  "modalite": "CT",
  "description": "Chest CT scan",
  "url": "/dicom/wado/1.2.840.113619.2.15.1008000062035011254.825190719.0.31.2.1",
  "orthancInstanceId": "2991c996-62ba403e-96d27bfe-33d472ee-f2b96e17"
}
```

### 3. Access Image Preview
```http
GET /dicom/instances/{orthancInstanceId}/preview?quality=90
Authorization: Bearer <token>
```

## Frontend Implementation

### JavaScript/TypeScript Example

```typescript
class MedicalImageService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: '/api',
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });
  }

  async uploadDicomFile(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.api.post('/dicom/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  }

  async registerImageMetadata(imageData: {
    examenID: string;
    studyInstanceUID: string;
    seriesInstanceUID: string;
    sopInstanceUID: string;
    dateAcquisition: string;
    modalite: string;
    description: string;
    url?: string;
    orthancInstanceId?: string;
  }): Promise<any> {
    const response = await this.api.post('/examens-medicaux/images', imageData);
    return response.data;
  }

  async uploadAndRegisterImage(
    file: File, 
    examenID: string, 
    description: string
  ): Promise<any> {
    try {
      // Step 1: Upload DICOM file to Orthanc
      const uploadResult = await this.uploadDicomFile(file);
      
      // Step 2: Register image metadata
      const imageMetadata = {
        examenID,
        studyInstanceUID: uploadResult.data.StudyInstanceUID,
        seriesInstanceUID: uploadResult.data.SeriesInstanceUID,
        sopInstanceUID: uploadResult.data.SOPInstanceUID,
        dateAcquisition: uploadResult.data.acquisitionDate || new Date().toISOString(),
        modalite: uploadResult.data.modality || 'UNKNOWN',
        description,
        url: `/dicom/wado/${encodeURIComponent(uploadResult.data.SOPInstanceUID)}`,
        orthancInstanceId: uploadResult.data.ID // NEW: Include Orthanc instance ID
      };

      const registrationResult = await this.registerImageMetadata(imageMetadata);
      
      return {
        success: true,
        image: registrationResult,
        orthancData: uploadResult.data
      };
    } catch (error) {
      console.error('Error uploading and registering image:', error);
      throw error;
    }
  }

  // NEW: Method to get image preview
  async getImagePreview(orthancInstanceId: string, quality: number = 90): Promise<Blob> {
    const response = await this.api.get(`/dicom/instances/${orthancInstanceId}/preview`, {
      params: { quality },
      responseType: 'blob'
    });
    return response.data;
  }
}
```

### React Component Example

```tsx
import React, { useState } from 'react';
import { MedicalImageService } from './MedicalImageService';

interface ImageDisplayProps {
  image: {
    imageID: string;
    orthancInstanceId: string;
    description: string;
    modalite: string;
  };
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ image }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const imageService = new MedicalImageService();

  const loadPreview = async () => {
    if (!image.orthancInstanceId) {
      setError('No preview available for this image');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const blob = await imageService.getImagePreview(image.orthancInstanceId, 90);
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
    } catch (error) {
      setError('Failed to load image preview');
      console.error('Preview error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="image-display">
      <h3>{image.description}</h3>
      <p>Modality: {image.modalite}</p>
      
      {!previewUrl && !loading && (
        <button onClick={loadPreview}>
          Load Preview
        </button>
      )}
      
      {loading && <div>Loading preview...</div>}
      
      {error && <div className="error">{error}</div>}
      
      {previewUrl && (
        <div className="preview-container">
          <img 
            src={previewUrl} 
            alt={image.description}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      )}
    </div>
  );
};
```

## Benefits of This Architecture

### 1. **Separation of Concerns**
- File upload is handled separately from metadata registration
- Each endpoint has a single responsibility

### 2. **Reliability**
- If metadata registration fails, the file is still uploaded to Orthanc
- Can retry metadata registration without re-uploading the file

### 3. **Scalability**
- File upload can be optimized independently
- Metadata processing can be queued for background processing

### 4. **Traceability**
- Direct URLs stored in database for quick access
- Orthanc instance IDs for preview access
- Clear audit trail of upload and registration events

### 5. **Flexibility**
- Can handle different image sources (upload, PACS integration, etc.)
- Easy to extend with additional metadata fields
- Support for both WADO and preview access methods

## Error Handling

### Common Error Scenarios

1. **File Upload Fails**
   - Network issues
   - Invalid DICOM file
   - Orthanc server unavailable

2. **Metadata Registration Fails**
   - Invalid exam ID
   - Database connection issues
   - Validation errors

3. **Preview Access Fails**
   - Invalid Orthanc instance ID
   - Orthanc server unavailable
   - Image not found in Orthanc

### Recommended Error Handling

```typescript
try {
  const result = await imageService.uploadAndRegisterImage(file, examenID, description);
  // Success
} catch (error) {
  if (error.response?.status === 400) {
    // Validation error - show specific error message
    showError(error.response.data.message);
  } else if (error.response?.status === 404) {
    // Exam not found
    showError('Medical exam not found');
  } else if (error.response?.status >= 500) {
    // Server error
    showError('Server error. Please try again later.');
  } else {
    // Network or other error
    showError('Connection error. Please check your internet connection.');
  }
}
```

## Security Considerations

1. **File Validation**: Ensure uploaded files are valid DICOM files
2. **Access Control**: Verify user permissions for exam access
3. **URL Security**: Validate and sanitize URLs before storage
4. **Orthanc Access**: Ensure proper authentication for Orthanc endpoints
5. **Audit Logging**: Log all image upload and registration events

## Performance Optimization

1. **File Size Limits**: Set appropriate file size limits for uploads
2. **Compression**: Consider compressing images for storage
3. **Caching**: Cache frequently accessed images and previews
4. **CDN**: Use CDN for image delivery in production
5. **Preview Quality**: Allow users to adjust preview quality for faster loading

## Monitoring and Logging

Monitor the following metrics:
- Upload success/failure rates
- File processing times
- Storage usage
- API response times
- Preview generation times

Log important events:
- File uploads
- Metadata registrations
- Preview access
- Access to medical images
- Error occurrences 