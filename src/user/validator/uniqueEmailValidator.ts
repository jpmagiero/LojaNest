import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { UserRepository } from "../user.repository";
import { Injectable } from "@nestjs/common";


@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface{
    
    constructor(private userRepository: UserRepository){}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const emailExists = await this.userRepository.emailExists(value);
        return !emailExists;
    }
}

export const UniqueEmail = (validationOptions: ValidationOptions) => {
    return (object: Object, property: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName:property,
            options: validationOptions,
            constraints: [],
            validator: UniqueEmailValidator
        })
    }
}