import { CreateUserDto } from '../../../adapter/dto/create-user.dto';
import { UpdateUserDto } from '../../../adapter/dto/update-user.dto';
import { User } from '../../../domain/user.domain';
import { SearchUserDto } from '../../../adapter/dto/PageRequest.dto';
import { Page } from '../../../adapter/dto/page';

export interface UserServiceInterface {
  //회원가입
  create(createUserDto: CreateUserDto): Promise<User>;

  //모든 회원 조회(슈퍼어드민제외)
  findAllWithoutSuperadmin(page: SearchUserDto): Promise<Page<User>>;
  findAllOnlyAdmin();

  //로그인
  findById(uuid: string): Promise<User>;

  //회원정보수정
  update(uuid: string, updateUserDto: UpdateUserDto);
  changeUserStatus(updateUserDto: UpdateUserDto);

  //회원탈퇴
  remove(uuid: string);

  //회원보상변경
  changeUserReward(uuid: string, rewardType: string, reward: number);
  //보상지급요청
  claimReward(uuid: string, address: string, rewardType: string, reward: number);

  //web2로그인

  //web3로그인


}
