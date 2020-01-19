const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

/* Normalmente os nomes dos métodos que representa um endpoint são: 
    - Index(Listagem completa)
    - Show(Mostrar um especifico)
    - Store(Criar)
    - Update(atualizar)
    - Destroyer(deletar)
*/

module.exports = {

    async index(request,response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {
    
        const {github_username, skils, latitude, longitude} = request.body;

        let dev = await Dev.findOne({github_username});

        if(!dev) {
            const apiReponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
            const {name = login,avatar_url,bio} = apiReponse.data;
        
            const skilsArray = parseStringAsArray(skils);
        
            const location = {
                type: 'Point',
                coordinates:[longitude,latitude]
            }
        
             dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                skils : skilsArray,
                location
            });    
        }
    
        return response.json(dev);
    }
}