const Clarifai = require('clarifai'); 

const app = new Clarifai.App({
 apiKey: 'ad49197fb7324637997f12f093e4b13e'
});

const handleApiCall = ( req, res ) => {
	app.models
	.predict(Clarifai.LOGO_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('Unable to work with API'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	// Issue with .where find solution when nessecary.
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('Unable to get count'))
}

module.exports = {
	handleImage,
	handleApiCall
}