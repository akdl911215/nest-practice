import { BaseDto } from 'src/_common/abstract/base.dto';
import { Post } from '@prisma/client';

export class PostsBaseDto extends BaseDto {
  public readonly idx: Post['idx'];
  public readonly title: Post['title'];
  public readonly content: Post['content'];

  public readonly createdAt: Post['created_at'];
  public readonly updatedAt: Post['updated_at'];
  public readonly deletedAt?: Post['deleted_at'];
}
