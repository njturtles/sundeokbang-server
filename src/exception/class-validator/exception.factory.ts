import { ValidationError } from '@nestjs/common';
import ApiError from '../../libs/common/res/api.error';
import ApiCodes from '../../libs/common/res/api.codes';
import ApiMessages from '../../libs/common/res/api.messages';

export class ClassValidatorExceptionFactory {
    throw(): (errors: ValidationError[]) => void {
        return (errors: ValidationError[]): void => {
            if (!errors.length) return;

            const firstError = errors[0];
            const firstErrorMessage =
                firstError.constraints[Object.keys(firstError.constraints)[0]];

            throw new ApiError(ApiCodes.BAD_REQUEST, ApiMessages.BAD_REQUEST, {
                description: firstErrorMessage,
            });
        };
    }
}
