import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdatePostDto {
  @IsOptional() @IsString()  @MinLength(1) @MaxLength(50) title?: string;
  @IsOptional() @IsString() @MinLength(1) @MaxLength(245) content?: string;
}
