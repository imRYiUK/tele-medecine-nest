import { PartialType } from '@nestjs/swagger';
import { CreateExamenMedicalDto } from './create-examen-medical.dto';

export class UpdateExamenMedicalDto extends PartialType(CreateExamenMedicalDto) {} 