import { BaseEntity, Entity, Column, ObjectIdColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IsMongoId } from 'class-validator';

@Entity()
export class User extends BaseEntity {
  @ObjectIdColumn()
  @IsMongoId()
  _id: string;

  @Column({ unique: true })
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  location: string;

  // @Column({ unique: true })
  // username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  async validatePassowrd(password: string): Promise<boolean> {
    const hashed = await bcrypt.hash(password, this.salt);
    return hashed === this.password;
  }
}
