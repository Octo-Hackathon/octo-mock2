module.exports.calculateEqiPercentage = function(minVal, maxVal, value, isPositive) {

	var step = 0.1;
	var position = (value + step - minVal) / step;
	var numberOfVal = ((maxVal - minVal) / step) + 1;
	if(!isPositive)
		return (1 - position / numberOfVal) * 100;
	else
		return position / numberOfVal * 100;
	
}

module.exports.calculateOtherPercentage = function(minVal, maxVal, value) {
	
	if(value >= 0)
		return (value / maxVal) * 100;
	else 
		return (value / minVal) * 100;	
	
}

module.exports.calculateUnemploymentPercentage = function(minVal, maxVal, value) {
	
	if(value >= 0)
		return 100-((value / maxVal) * 100);
	else 
		return 100-((value / minVal) * 100);	
	
}

module.exports.minimumValue = function(array) {

	return Math.min.apply(null, array);
	
}

module.exports.maximumValue = function(array) {

	return Math.max.apply(null, array);
	
}

module.exports.rating = function(percent) {

	if(percent > 0 && percent <= 40)
		return 'Poor';
	else if(percent > 40 && percent <= 80)
		return 'Average';
	else(percent > 80)
		return 'Good';
	
}