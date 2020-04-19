import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class HasLowercase implements ValidatorConstraintInterface {
  public validate(value: string): boolean {
    return /^(?=.*[a-z])/.test(value);
  }

  public defaultMessage({ property }): string {
    return `${property} must contain a lowercase`;
  }
}
