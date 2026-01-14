import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString() @MinLength(1) @MaxLength(20) title: string;
  @IsString() @MinLength(1) @MaxLength(245) content: string;
}
