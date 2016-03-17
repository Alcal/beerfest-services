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

	
	Brewery.observe('access', function (context, next)
	{
		var sortByName = function(a, b)
		{ 
			if(a && b)
		    {
		      if(a.name == b.name)
		        return 0;
		      else if(a.name < b.name)
		        return -1;
		      else if (a.name > b.name)
		        return 1;
		    }
		    else
		      return 0; }

		context.data.sort(sortByName);

		next();
	});
};
