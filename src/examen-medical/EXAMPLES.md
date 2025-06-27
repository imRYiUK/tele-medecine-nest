# Examples d'utilisation des endpoints d'examens médicaux

## Créer un examen médical

### Endpoint
```
POST /examens-medicaux
```

### Headers
```
Content-Type: application/json
Authorization: Bearer <your-jwt-token>
```

### Body Example
```json
{
  "dossierID": "123e4567-e89b-12d3-a456-426614174000",
  "patientID": "123e4567-e89b-12d3-a456-426614174001",
  "typeExamenID": "123e4567-e89b-12d3-a456-426614174002",
  "dateExamen": "2024-01-15T10:30:00.000Z",
  "description": "Radiographie du thorax pour suspicion de pneumonie",
  "resultat": null,
  "estAnalyse": false
}
```

### Format des champs

#### UUIDs requis
- `dossierID`: UUID du dossier médical (format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx) **OBLIGATOIRE**
- `patientID`: UUID du patient (format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx) **OBLIGATOIRE**
- `typeExamenID`: UUID du type d'examen (format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx) **OBLIGATOIRE**

#### Date
- `dateExamen`: Date au format ISO 8601 (ex: "2024-01-15T10:30:00.000Z") **OBLIGATOIRE**
- Formats acceptés:
  - `"2024-01-15T10:30:00.000Z"` (avec timezone)
  - `"2024-01-15T10:30:00"` (sans timezone)
  - `"2024-01-15"` (date seulement)

#### Champs optionnels
- `resultat`: Chaîne de caractères (null si pas encore analysé)
- `estAnalyse`: Booléen (false par défaut)

### Réponse attendue
```json
{
  "examenID": "123e4567-e89b-12d3-a456-426614174003",
  "dossierID": "123e4567-e89b-12d3-a456-426614174000",
  "patientID": "123e4567-e89b-12d3-a456-426614174001",
  "typeExamenID": "123e4567-e89b-12d3-a456-426614174002",
  "demandeParID": "123e4567-e89b-12d3-a456-426614174004",
  "dateExamen": "2024-01-15T10:30:00.000Z",
  "description": "Radiographie du thorax pour suspicion de pneumonie",
  "resultat": null,
  "estAnalyse": false,
  "consultationID": null,
  "patient": {
    "nom": "Dupont",
    "prenom": "Jean",
    "dateNaissance": "1980-05-15T00:00:00.000Z"
  },
  "typeExamen": {
    "typeExamenID": "123e4567-e89b-12d3-a456-426614174002",
    "nomType": "Radiographie",
    "description": "Examen radiographique standard",
    "categorie": "Imagerie"
  },
  "demandePar": {
    "nom": "Martin",
    "prenom": "Dr. Sophie",
    "role": "MEDECIN"
  }
}
```

## Erreurs courantes et solutions

### Erreur: "dossierID doit être un UUID valide"
**Cause**: Le format de l'UUID n'est pas valide ou le champ est manquant
**Solution**: Utilisez le format `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` et assurez-vous que le champ est présent

### Erreur: "dossierID est requis pour créer un examen médical"
**Cause**: Le champ dossierID n'est pas fourni dans la requête
**Solution**: Ajoutez le champ dossierID avec un UUID valide

### Erreur: "dateExamen doit être une date valide au format ISO"
**Cause**: La date n'est pas au bon format
**Solution**: Utilisez le format ISO 8601: `"2024-01-15T10:30:00.000Z"`

### Erreur: "description doit être une chaîne de caractères"
**Cause**: Le champ description n'est pas une chaîne de caractères
**Solution**: Entourez la description de guillemets

## Obtenir les UUIDs nécessaires

### Obtenir les types d'examens
```
GET /examens-medicaux/types
```

### Obtenir les patients
```
GET /patients
```

### Obtenir les dossiers médicaux
```
GET /dossiers-medicaux
``` 