import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class HasSpecialCharacter implements ValidatorConstraintInterface {
  public validate(value: string): boolean {
    return /^(?=.*\W).*$/.test(value);
  }

  public defaultMessage({ property }): string {
    return `${property} must contain a special character`;
  }
}
