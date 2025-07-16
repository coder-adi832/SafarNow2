const axios = require('axios');

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAP_API 
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`

    try {
        const response = await axios.get(url)
        if(response.data.status === 'OK'){
            const location = response.data.results[0].geometry.location
            return{
                ltd: location.lat,
                lng: location.lng
            }
        } else {
            throw new Error('Unable to fetch coordinates')
        }
    } catch(err) {
        console.log(err);
        throw err
    }
}

module.exports.getDistanceTime = async (pickup, destination) => {
    const apiKey = process.env.GOOGLE_MAP_API
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(pickup)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const respone = await axios.get(url)
        if(respone.data.status === 'OK'){
            if(respone.data.rows[0].elements[0].status === 'ZERO_RESULTS'){
                throw new Error('NO ROUTES FOUND')
            }

            return respone.data.rows[0].elements[0]
        }
        else{
            throw new Error('unable to find distace and time')
        }
    } catch (err){
        console.log(err)
        throw err
    }

}

module.exports.getSuggestion = async (input) => {
    const apiKey = process.env.GOOGLE_MAP_API   
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
    try {
        const response = await axios.get(url)
        if(response.data.status === 'OK'){
            return response.data.predictions; 
        }
        else{
            throw new Error('Unable to find suggestions')
        }
    } catch (err){
        console.log(err)
        throw err
    }
}