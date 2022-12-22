import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { UserService } from '../../../application/service/user.service';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { AccessTokenGuard } from '../../../../util/common/guards/accessToken.guard';
import { HandlerRolesGuard, Roles } from '../../../../util/decorator/roles.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SearchUserDto } from '../../dto/PageRequest.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  //TODO: User Create
  //TODO: User Update
  //TODO: User Read by UUID
  //TODO: User Read by Username
  //TODO: User Read by Email
  //TODO: User Delete
  //TODO: User Read All
  //TODO: User Read All by company
  //TODO: Token Claim

  //TODO :SuperAdmin read Admin User
  //TODO: only SuperAdmin
  //TODO: data filtering

  @ApiOperation({ summary: '(AccessToken, Superadmin) admin 조회' })
  @ApiForbiddenResponse({ description: '권한 없음' })
  @UseGuards(AccessTokenGuard)
  @UseGuards(HandlerRolesGuard)
  @Roles('SUPERADMIN')
  @ApiBearerAuth('accessToken')
  @Get('/admin')
  findAllAdmin() {
    return this.usersService.findAllOnlyAdmin();
  }

  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '(AccessToken, Superadmin) 유저 타입 변경 [ADMIN, USER],[ACTIVE, INACTIVE, PENDING, BLOCKED]',
  })
  @ApiCreatedResponse({ description: '유저타입이 변경됨.' })
  @ApiBody({
    schema: {
      properties: {
        email: { type: 'string' },
        userType: { type: 'string' },
        status: { type: 'string' },
      },
    },
  })
  @UseGuards(AccessTokenGuard)
  @Roles('SUPERADMIN')
  @Post('/usertype')
  changeUserStatus(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.changeUserStatus(updateUserDto);
  }

  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: '(AccessToken, SuperAdmin)모든 user 조회' })
  @UseGuards(AccessTokenGuard)
  @Roles('SUPERADMIN')
  @Get('/all')
  findAllWithoutSuperadmin(@Query() page: SearchUserDto) {
    return this.usersService.findAllWithoutSuperadmin(page);
  }

  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: '(AccessToken)' })
  @UseGuards(AccessTokenGuard)
  @Patch(':uuid')
  update(@Param('uuid') uuid: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(uuid, updateUserDto);
  }

  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: '(AccessToken)' })
  @UseGuards(AccessTokenGuard)
  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.usersService.remove(uuid);
  }
}
