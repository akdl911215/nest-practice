export abstract class BaseDto {
  abstract idx: string;
  abstract createdAt: Date;
  abstract updatedAt: Date;
  abstract deletedAt?: Date | null;
}
