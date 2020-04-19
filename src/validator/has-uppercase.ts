import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class HasUppercase implements ValidatorConstraintInterface {
  public validate(value: string): boolean {
    return /^(?=.*[A-Z])/.test(value);
  }

  public defaultMessage({ property }): string {
    return `${property} must contain an uppercase`;
  }
}
