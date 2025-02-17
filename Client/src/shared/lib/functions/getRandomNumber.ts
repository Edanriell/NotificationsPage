export const getRandomNumber = (min: number = 1, max: number = 100): number => {
	if (min > max) {
		throw new Error("Minimum value cannot be greater than maximum value.");
	}

	const adjustedMin = Math.ceil(min);
	const adjustedMax = Math.floor(max);

	return Math.floor(Math.random() * (adjustedMax - adjustedMin + 1)) + adjustedMin;
};
