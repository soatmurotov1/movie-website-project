import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ example: '1' })
  id: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @ApiProperty({ example: '2025-12-17T12:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-12-17T12:00:00.000Z' })
  updatedAt: Date;
}
