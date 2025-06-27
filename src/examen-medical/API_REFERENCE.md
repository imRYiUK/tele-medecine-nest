# Medical Image API Reference

## Quick Reference

### Endpoints Overview

| Method | Endpoint | Purpose | Content-Type |
|--------|----------|---------|--------------|
| `POST` | `/dicom/upload` | Upload DICOM file to Orthanc | `multipart/form-data` |
| `POST` | `/examens-medicaux/images` | Register image metadata | `application/json` |
| `GET` | `/examens-medicaux/:id/images` | Get images for an exam | `application/json` |
| `GET` | `/examens-medicaux/images/:imageId` | Get specific image details | `application/json` |

## Request/Response Examples

### 1. Upload DICOM File

**Request:**
```bash
curl -X POST http://localhost:3000/dicom/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@/path/to/image.dcm"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "ID": "orthanc-instance-id",
    "StudyInstanceUID": "1.2.840.113619.2.15.1008000062035011254.825190719.2.31",
    "SeriesInstanceUID": "1.2.840.113619.2.15.1008000062035011254.825190719.1.31",
    "SOPInstanceUID": "1.2.840.113619.2.15.1008000062035011254.825190719.0.31.2.1",
    "MainDicomTags": {
      "Modality": "CT",
      "ImageComments": "Sample image"
    }
  }
}
```

### 2. Register Image Metadata

**Request:**
```bash
curl -X POST http://localhost:3000/examens-medicaux/images \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "examenID": "c627b932-4370-4123-bad4-a81be00dad8d",
    "studyInstanceUID": "1.2.840.113619.2.15.1008000062035011254.825190719.2.31",
    "seriesInstanceUID": "1.2.840.113619.2.15.1008000062035011254.825190719.1.31",
    "sopInstanceUID": "1.2.840.113619.2.15.1008000062035011254.825190719.0.31.2.1",
    "dateAcquisition": "1996-03-08T00:00:00.000Z",
    "modalite": "CT",
    "description": "Chest CT scan",
    "url": "/dicom/wado/1.2.840.113619.2.15.1008000062035011254.825190719.0.31.2.1"
  }'
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
  "url": "/dicom/wado/1.2.840.113619.2.15.1008000062035011254.825190719.0.31.2.1"
}
```

## Data Types

### CreateImageMedicaleDto
```typescript
{
  examenID: string;                    // Required: Medical exam ID
  studyInstanceUID: string;            // Required: DICOM Study Instance UID
  seriesInstanceUID: string;           // Required: DICOM Series Instance UID
  sopInstanceUID: string;              // Required: DICOM SOP Instance UID
  dateAcquisition: string;             // Required: ISO date string
  modalite: string;                    // Required: Image modality (CT, MRI, etc.)
  description: string;                 // Required: Human-readable description
  url?: string | null;                 // Optional: Direct access URL
}
```

### ImageMedicaleDto
```typescript
{
  imageID: string;                     // Auto-generated UUID
  examenID: string;                    // Medical exam ID
  studyInstanceUID: string;            // DICOM Study Instance UID
  seriesInstanceUID: string;           // DICOM Series Instance UID
  sopInstanceUID: string;              // DICOM SOP Instance UID
  dateAcquisition: string;             // ISO date string
  modalite: string;                    // Image modality
  description: string;                 // Human-readable description
  url?: string | null;                 // Direct access URL
}
```

## Error Responses

### Common Error Codes

| Status | Code | Description |
|--------|------|-------------|
| `400` | `BAD_REQUEST` | Invalid request data |
| `401` | `UNAUTHORIZED` | Missing or invalid token |
| `403` | `FORBIDDEN` | Insufficient permissions |
| `404` | `NOT_FOUND` | Exam or image not found |
| `409` | `CONFLICT` | Image already exists |
| `500` | `INTERNAL_SERVER_ERROR` | Server error |

### Error Response Format
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request",
  "details": [
    "examenID must be a valid UUID",
    "modalite is required"
  ]
}
```

## Authentication

All endpoints require Bearer token authentication:

```bash
Authorization: Bearer YOUR_JWT_TOKEN
```

## Rate Limiting

- Upload endpoints: 10 requests per minute
- Metadata endpoints: 100 requests per minute

## File Upload Limits

- Maximum file size: 100MB
- Supported formats: `.dcm`, `.dicom`
- Maximum concurrent uploads: 5 per user

## Testing

### Using Postman

1. **Upload DICOM File:**
   - Method: `POST`
   - URL: `{{baseUrl}}/dicom/upload`
   - Headers: `Authorization: Bearer {{token}}`
   - Body: `form-data` with key `file` and file value

2. **Register Image:**
   - Method: `POST`
   - URL: `{{baseUrl}}/examens-medicaux/images`
   - Headers: `Authorization: Bearer {{token}}`, `Content-Type: application/json`
   - Body: Raw JSON with image metadata

### Environment Variables

```bash
baseUrl=http://localhost:3000
token=YOUR_JWT_TOKEN
```

## WebSocket Events (if applicable)

For real-time updates:

```javascript
// Connect to WebSocket
const ws = new WebSocket('ws://localhost:3000/ws');

// Listen for image upload events
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'IMAGE_UPLOADED') {
    console.log('Image uploaded:', data.image);
  }
};
``` 