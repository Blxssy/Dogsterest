import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DogService {
  constructor(private prisma: PrismaService) {}
  // async GetDog(fileName: string) {
  //   const dog = await this.prisma.dog.findUnique({
  //     where: {
  //       filename: fileName,
  //     },
  //   });
  //   if (!dog) throw new NotFoundException('Dog not found');
  //
  //   return dog;
  // }

  async GetById(id: number) {
    const dog = await this.prisma.dog.findUnique({
      where: {
        id: +id,
      },
    });
    if (!dog) throw new NotFoundException('dog not found');
    return dog;
  }

  async GetDogs() {
    return this.prisma.dog.findMany({
      where: {
        filename: {
          endsWith: '.jpg',
        },
      },
      take: 40,
    });
  }

  async like(id: number) {
    const dog = await this.GetById(id);
    return this.prisma.dog.update({
      where: {
        id: +dog.id,
      },
      data: {
        likes: dog.likes + 1,
      },
    });
  }
}
