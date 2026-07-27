module.exports.autocompleteLocationData = async (req, res, next ) => {
    let map_api_key = `${process.env.GEOAPIFY_API_KEY}`;
    let {text} = req.query;
    const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&lang=en&limit=3&format=json&apiKey=${map_api_key}`);
    const data = await response.json();
    res.json(data);
}
module.exports.geocode = async ( req, res, next ) =>  {
    let map_api_key = `${process.env.GEOAPIFY_API_KEY}`;// bad request problem with invalid text needs to be taken care of here
    // let {text} = req.query;
    let {text} = req.query;

    const response = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${text}&lang=en&limit=1&format=json&apiKey=${map_api_key}`);
    // const data = await response.json();
    const data = await response.json();
    res.json(data);
}