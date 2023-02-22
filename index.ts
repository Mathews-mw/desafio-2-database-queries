import { Connection, createConnection } from 'typeorm';
import { GamesRepository } from './src/modules/games/repositories/implementations/GamesRepository';
import { UsersRepository } from "./src/modules/users/repositories/implementations/UsersRepository";

async function testQuerys() {
  const connection = await createConnection();

  const gamesRepository = new GamesRepository()
  
  const users = await gamesRepository.findUsersByGameId('d4625e89-11e4-4f26-9bb6-8ba459341287')
  
  console.log("games: ", users)

  await connection.close()
}

testQuerys();
