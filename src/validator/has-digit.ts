import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class HasDigit implements ValidatorConstraintInterface {
  public validate(value: string): boolean {
    return /^(?=.*[0-9])/.test(value);
  }

  public defaultMessage({ property }): string {
    return `${property} must contain a digit`;
  }
}
