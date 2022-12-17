import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {

    const user = await this.repository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.games", "games")
      .where("user.id = :id", {id: user_id})
      .getOne()

      if(!user) {
        throw new Error("User not found!");

      }

      return user
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query('SELECT * from users ORDER BY users.first_name');
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.query('SELECT * from users WHERE upper(users.first_name) = $1 AND upper(users.last_name) = $2', [first_name.toUpperCase(), last_name.toUpperCase()]);
  }
}
