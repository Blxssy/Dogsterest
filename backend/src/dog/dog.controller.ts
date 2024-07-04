import { Controller, Get, Param, Patch } from '@nestjs/common';
import { DogService } from './dog.service';

@Controller('dog')
export class DogController {
  constructor(private readonly dogService: DogService) {}

  // @Get(':fileName')
  // async getDog(@Param('fileName') fileName: string) {
  //   return this.dogService.GetDog(fileName);
  // }

  @Get()
  async getAll() {
    return this.dogService.GetDogs();
  }

  @Patch(':id')
  async like(@Param('id') id: number) {
    return this.dogService.like(id);
  }
}
