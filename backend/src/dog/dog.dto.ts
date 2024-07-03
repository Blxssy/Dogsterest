import { IsInt, IsString } from 'class-validator';

export class DogDto {
  @IsInt()
  id: number;
  likes: number;

  @IsString()
  filename: string;
}
