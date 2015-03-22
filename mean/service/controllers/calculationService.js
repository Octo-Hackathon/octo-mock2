module.exports.calculateEqiPercentage = function(minVal, maxVal, value, isNegative) {

	var step = 0.1;
	var position = (value + step - minVal) / step;
	var numberOfVal = ((maxVal - minVal) / step) + 1;
	if(isNegative)
		return (1 - position / numberOfVal) * 100;
	else
		return position / numberOfVal * 100;
	
}

module.exports.calculateOtherPercentage = function(maxVal, value) {

	return value / maxVal * 100;
	
}

module.exports.minimumValue = function(array) {

	return Math.min.apply(null, array);
	
}

module.exports.maximumValue = function(array) {

	return Math.max.apply(null, array);
	
}