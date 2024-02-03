import { PartialType, IntersectionType, PickType, OmitType } from '@nestjs/swagger';

import { UserDto } from './user.dto';

class RequiredId extends PickType(UserDto, ['id']) {}
class PartialPropsWithoutId extends PartialType(OmitType(UserDto, ['id'])) {}
export class UpdateUserDto extends IntersectionType(RequiredId, PartialPropsWithoutId) {}

// export class UpdateUserDto extends IntersectionType(PickType(UserDto, ['id']), PartialType(OmitType(UserDto, ['id']))) {}
