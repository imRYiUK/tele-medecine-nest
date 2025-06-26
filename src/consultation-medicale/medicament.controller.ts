import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { MedicamentService } from './medicament.service';
import { MedicamentDto } from './dto/medicament.dto';

@ApiTags('medicaments')
@Controller('medicaments')
export class MedicamentController {
  constructor(private readonly medicamentService: MedicamentService) {}

  @Get()
  @ApiOperation({ summary: 'Get all medications' })
  @ApiResponse({ status: 200, description: 'List of all medications', type: [MedicamentDto] })
  async findAll(): Promise<MedicamentDto[]> {
    return this.medicamentService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search medications by name' })
  @ApiQuery({ name: 'q', description: 'Search term' })
  @ApiResponse({ status: 200, description: 'List of matching medications', type: [MedicamentDto] })
  async searchByName(@Query('q') searchTerm: string): Promise<MedicamentDto[]> {
    return this.medicamentService.searchByName(searchTerm);
  }

  @Get('autocomplete')
  @ApiOperation({ summary: 'Get medications for autocomplete (starts with)' })
  @ApiQuery({ name: 'q', description: 'Search term' })
  @ApiResponse({ status: 200, description: 'List of medications for autocomplete', type: [MedicamentDto] })
  async searchByNameStartsWith(@Query('q') searchTerm: string): Promise<MedicamentDto[]> {
    return this.medicamentService.searchByNameStartsWith(searchTerm);
  }

  @Get('random')
  @ApiOperation({ summary: 'Get random medications' })
  @ApiQuery({ name: 'limit', description: 'Number of medications to return', required: false })
  @ApiResponse({ status: 200, description: 'List of random medications', type: [MedicamentDto] })
  async getRandomMedicaments(@Query('limit') limit?: string): Promise<MedicamentDto[]> {
    const limitNumber = limit ? parseInt(limit, 10) : 10;
    return this.medicamentService.getRandomMedicaments(limitNumber);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific medication by ID' })
  @ApiResponse({ status: 200, description: 'Medication details', type: MedicamentDto })
  @ApiResponse({ status: 404, description: 'Medication not found' })
  async findOne(@Param('id') medicamentID: string): Promise<MedicamentDto> {
    return this.medicamentService.findOne(medicamentID);
  }
} 