import { Controller, Post, Get, Put, Delete, Body, Param, Req } from '@nestjs/common';
import { RendezVousService } from './rendez-vous.service';
import { UpdateRendezVousDto } from './dto/update-rendez-vous.dto';

@Controller('rendez-vous')
export class RendezVousController {
  constructor(private readonly rendezVousService: RendezVousService) {}

  @Post()
  async create(@Body() body: any, @Req() req) {
    // req.user.utilisateurID = créateur
    return this.rendezVousService.create({ ...body, createdByID: req.user.utilisateurID });
  }

  @Get()
  async findAll() {
    return this.rendezVousService.findAll();
  }

  @Get('medecin/:medecinID')
  async findByMedecin(@Param('medecinID') medecinID: string) {
    return this.rendezVousService.findByMedecin(medecinID);
  }

  @Get('patient/:patientID')
  async findByPatient(@Param('patientID') patientID: string) {
    return this.rendezVousService.findByPatient(patientID);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateRendezVousDto) {
    return this.rendezVousService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.rendezVousService.remove(id);
  }
} 