import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";

class SettingsController{

  /**
   * Tipos de parametros:
   * Routes Params => parametros de rotas;
   * http://localhost:3000/settings/1
   * Query Params => filtros e buscas;
   * http://localhost:3000/settings/1?search=algumacoisa
   * Body params => {  }
   */

  async create(request, response){
    const { chat, username } = request.body;

    const settingsRepository = getCustomRepository(SettingsRepository);

    const settings = settingsRepository.create({
      chat,
      username
    });

    await settingsRepository.save(settings);

    return response.json(settings);
  }
}

export { SettingsController }