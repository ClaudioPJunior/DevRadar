const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response) {
        //Busca todos os devs num raio de 10KM latitude e longitude
        //Filtrar por tecnologias
        //console.log(request.query);

        const{latitude, longitude, skils} = request.query;

        const skilsArray = parseStringAsArray(skils);

        //console.log(skilsArray);

        const devs = await Dev.find({
            skils: {
                $in: skilsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates:[longitude,latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });

        return response.json({devs});
    }
}