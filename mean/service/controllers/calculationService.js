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
	//console.log('Max Val :: '+maxVal);
	//console.log('Min Val :: '+minVal);
	//console.log('Val :: '+value);
	if(value >= 0)
		return (value / maxVal) * 100;
	else 
		return (value / minVal) * 100;	
	
}

module.exports.minimumValue = function(array) {

	return Math.min.apply(null, array);
	
}

module.exports.maximumValue = function(array) {

	return Math.max.apply(null, array);
	
}