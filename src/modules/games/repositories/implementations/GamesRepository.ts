import { join } from 'path';
import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const games = await this.repository
      .createQueryBuilder("games")
      .where("lower(games.title) like :title", { title: `%${param.toLocaleLowerCase()}%`})
      .getMany();
      // Complete usando query builder

    return games;
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return await this.repository.query(`
      SELECT COUNT(g.title) FROM games g
    `); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const users = await this.repository.query(`
      select distinct u.* from games g
      join users_games_games ugg on g.id  = ugg."gamesId" 
      join users u on u.id = ugg."usersId"
      where ugg."gamesId" = '${id}'
      order by u.first_name ASC
    `)
      
      // Complete usando query builder
    return users
  }
}
