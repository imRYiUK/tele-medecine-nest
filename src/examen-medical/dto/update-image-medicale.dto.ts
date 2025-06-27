import { PartialType } from '@nestjs/swagger';
import { CreateImageMedicaleDto } from './create-image-medicale.dto';

export class UpdateImageMedicaleDto extends PartialType(CreateImageMedicaleDto) {} 