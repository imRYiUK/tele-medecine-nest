# Module Examen Medical

Ce module gère les examens médicaux et leurs images associées dans le système de télé-médecine.

## Relation entre Examens Médicaux et Images

### Structure de la Base de Données

La relation entre les examens médicaux et les images est définie dans le schéma Prisma :

```prisma
model ExamenMedical {
  examenID       String                @id @default(uuid())
  // ... autres champs ...
  images         ImageMedicale[]       // Relation one-to-many
  // ... autres champs ...
}

model ImageMedicale {
  imageID           String               @id @default(uuid())
  examenID          String              // Clé étrangère vers ExamenMedical
  // ... autres champs ...
  examen            ExamenMedical        @relation(fields: [examenID], references: [examenID])
  // ... autres champs ...
}
```

### Flux de Travail Typique

1. **Création d'un examen médical** : Un médecin crée un examen médical
2. **Ajout d'images** : Des images DICOM sont ajoutées à l'examen via le système Orthanc
3. **Analyse** : Un radiologue analyse les images et fournit un résultat
4. **Consultation** : Le médecin consulte les résultats et images

## DTOs (Data Transfer Objects)

### DTOs pour les Examens Médicaux

#### `CreateExamenMedicalDto`
- Utilisé pour créer un nouvel examen médical
- Ne contient pas d'images (ajoutées séparément)
- Inclut les informations de base : patient, type d'examen, description

#### `ExamenMedicalResponseDto`
- DTO de réponse complet incluant toutes les relations
- Contient les images associées (`images: ImageMedicaleDto[]`)
- Inclut les informations du patient, type d'examen, et radiologues

#### `ExamenMedicalListDto`
- DTO pour les listes d'examens avec compteurs
- Inclut `nombreImages` et `nombreRadiologues`
- Optimisé pour les vues de liste

### DTOs pour les Images Médicales

#### `ImageMedicaleDto`
- DTO de base pour les images médicales
- Contient `examenID` pour lier l'image à l'examen
- Inclut les métadonnées DICOM (UIDs, modalité, etc.)

#### `CreateImageMedicaleDto`
- Utilisé pour ajouter une nouvelle image à un examen
- Valide que l'examen existe
- Inclut toutes les métadonnées nécessaires

#### `UpdateImageMedicaleDto`
- Permet la mise à jour partielle des images
- Hérite de `CreateImageMedicaleDto` avec `PartialType`

## Endpoints API

### Endpoints pour les Examens

#### `POST /examens-medicaux`
- Crée un nouvel examen médical
- Rôle requis : MEDECIN, RADIOLOGUE

#### `GET /examens-medicaux`
- Récupère tous les examens avec filtres
- Rôle requis : MEDECIN, RADIOLOGUE

#### `GET /examens-medicaux/:id`
- Récupère un examen spécifique avec toutes ses relations
- Inclut automatiquement les images associées

#### `GET /examens-medicaux/liste-avec-images`
- Récupère la liste des examens avec compteurs d'images
- Optimisé pour les vues de tableau

### Endpoints pour les Images

#### `GET /examens-medicaux/:examenId/images`
- Récupère toutes les images d'un examen spécifique
- Triées par date d'acquisition (plus récentes en premier)

#### `GET /examens-medicaux/:examenId/images/count`
- Récupère le nombre d'images d'un examen
- Utile pour les indicateurs et statistiques

#### `POST /examens-medicaux/images`
- Ajoute une nouvelle image à un examen
- Rôle requis : RADIOLOGUE
- Vérifie automatiquement l'existence de l'examen

#### `PATCH /examens-medicaux/images/:imageId`
- Met à jour une image existante
- Rôle requis : RADIOLOGUE

#### `DELETE /examens-medicaux/images/:imageId`
- Supprime une image
- Rôle requis : RADIOLOGUE

## Exemples d'Utilisation

### Créer un examen médical

```typescript
const examenData: CreateExamenMedicalDto = {
  dossierID: "uuid-du-dossier",
  patientID: "uuid-du-patient",
  typeExamenID: "uuid-du-type-examen",
  dateExamen: new Date(),
  description: "Radiographie du thorax pour suspicion de pneumonie"
};

const examen = await examenMedicalService.create(examenData, userId);
```

### Ajouter une image à un examen

```typescript
const imageData: CreateImageMedicaleDto = {
  examenID: "uuid-de-l-examen",
  studyInstanceUID: "1.2.3.4.5.6.7.8.9",
  seriesInstanceUID: "1.2.3.4.5.6.7.8.9.1",
  sopInstanceUID: "1.2.3.4.5.6.7.8.9.1.1",
  dateAcquisition: new Date(),
  modalite: "CT",
  description: "Coupe axiale thoracique"
};

const image = await examenMedicalService.createImage(imageData);
```

### Récupérer un examen avec ses images

```typescript
const examen = await examenMedicalService.findOne(examenId);
// examen.images contient toutes les images associées
console.log(`Examen a ${examen.images.length} images`);
```

## Notifications

Le système envoie automatiquement des notifications lors des événements suivants :

- **Nouvelle image ajoutée** : Notifie le médecin demandeur
- **Image mise à jour** : Notifie le médecin demandeur
- **Image supprimée** : Notifie le médecin demandeur

## Sécurité et Permissions

- **Médecins** : Peuvent créer, consulter et modifier les examens
- **Radiologues** : Peuvent gérer les images et analyser les examens

## Intégration avec Orthanc

Les images sont généralement ajoutées via le système Orthanc (PACS) qui :
1. Reçoit les fichiers DICOM
2. Sauvegarde les métadonnées via l'endpoint `/dicom/save-metadata`
3. Lie automatiquement l'image à l'examen via `examenID` 