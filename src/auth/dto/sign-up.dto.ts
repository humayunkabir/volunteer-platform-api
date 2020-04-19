import { HasSpecialCharacter } from '../../validator/has-special-character';
import { HasDigit } from '../../validator/has-digit';
import { HasLowercase } from '../../validator/has-lowercase';
import { HasUppercase } from '../../validator/has-uppercase';
import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  Validate,
  IsPhoneNumber,
  IsNotEmpty,
} from 'class-validator';

export class SignUpDto {
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  firstName: string;

  @IsString()
  @MinLength(1)
  @MaxLength(20)
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsPhoneNumber('Bangladesh')
  phone: string;

  @IsNotEmpty()
  @MaxLength(20)
  location: string;

  // Password between 8 and 20 characters; must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character, but cannot contain whitespace.
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Validate(HasSpecialCharacter)
  @Validate(HasDigit)
  @Validate(HasLowercase)
  @Validate(HasUppercase)
  password: string;

  // @IsOptional()
  // projects: [string];
}
