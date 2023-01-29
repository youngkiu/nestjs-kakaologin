import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'kakao',
    description: 'OAuth provider name',
    required: true,
  })
  public provider: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: '1234',
    description: 'User id of OAuth provider',
    required: true,
  })
  public id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'youngkiu',
    description: 'User name of OAuth provider',
    required: true,
  })
  public username: string;

  @IsString()
  @ApiProperty({
    example: 'opensource',
    description: 'Nickname of OAuth provider',
  })
  public nickname: string;

  @IsUrl()
  @ApiProperty({
    example:
      'http://k.kakaocdn.net/dn/V9DTr/btrBqDCsBrN/7vEQ5nEPRdYAdBiQQE2z5K/img_640x640.jpg',
    description: 'Profile Image URL of OAuth provider',
  })
  public profileImage: string;

  @IsUrl()
  @ApiProperty({
    example:
      'http://k.kakaocdn.net/dn/V9DTr/btrBqDCsBrN/7vEQ5nEPRdYAdBiQQE2z5K/img_110x110.jpg',
    description: 'Thumbnail Image URL of OAuth provider',
  })
  public thumbnailImage: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'ngI0v2YUJ9e2UPfBFjlKriIZvXvOGKfgh59hda0v....',
    description: 'AccessToken of OAuth provider',
    required: true,
  })
  public accessToken: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'xxYqH5kUtwiKsyiZqbl5-ElGkDIsMAZUjcKKYJun....',
    description: 'RefreshToken of OAuth provider',
    required: true,
  })
  public refreshToken: string;
}
