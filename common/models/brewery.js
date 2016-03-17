module.exports = function(Brewery) {

	Brewery.allBrews = function(cb)
	{	
		var BreweryCollection = Brewery.getDataSource().connector.collection(Brewery.modelName);

		BreweryCollection.aggregate(
			{"$unwind":"$brews"},
			{"$project":{"brews":1}},
			function(err, data)
			{
				cb(err, data);
			}
		);
	};

	Brewery.remoteMethod(
		'allBrews',
		{
			accepts:[],
			returns:{arg:'data'},
			http:{verb:"GET", status:200, errorStatus:400}
		}
	);
};
