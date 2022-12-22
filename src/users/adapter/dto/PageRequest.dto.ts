import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

//페이지네이션 요청 받을때 사용하는 클래스 양식
export class PageRequest {
  //@IsOptional() 데코레이터는 undefined도 받을 수 있다.
  @IsString()
  @ApiProperty({ type: Number, description: 'pageNo', required: false })
  @IsOptional()
  pageNo?: number | 1;

  @IsString()
  @ApiProperty({ type: Number, description: 'pageSize', required: false })
  @IsOptional()
  pageSize?: number | 10;

  getOffset(): number {
    if (this.pageNo < 1 || this.pageNo === null || this.pageNo === undefined) {
      this.pageNo = 1;
    }

    if (this.pageSize < 1 || this.pageSize === null || this.pageSize === undefined) {
      this.pageSize = 10;
    }

    return (Number(this.pageNo) - 1) * Number(this.pageSize);
  }

  getLimit(): number {
    if (this.pageSize < 1 || this.pageSize === null || this.pageSize === undefined) {
      this.pageSize = 10;
    }
    return Number(this.pageSize);
  }
}

export class SearchUserDto extends PageRequest {
  // @IsOptional()
  // @ApiProperty({ type: Number, description: 'pageNo', required: false })
  // pageNo?: number;
  //
  // @IsOptional()
  // @ApiProperty({ type: Number, description: 'pageSize', required: false })
  // pageSize?: number;
}
