import { PartialType } from '@nestjs/swagger';
import { CreateConsultationMedicaleDto } from './create-consultation-medicale.dto';

export class UpdateConsultationMedicaleDto extends PartialType(CreateConsultationMedicaleDto) {} 