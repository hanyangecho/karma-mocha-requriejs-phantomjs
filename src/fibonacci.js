define(function () {
	function fibonacci(n) {
		if (typeof n !== 'number') {
			throw new Error('n should be a Number');
		}
		if (n < 0) {
			throw new Error('n should >= 0');
		}
		if (n > 10) {
			throw new Error('n should <= 10');
		}
		if (n === 0) {
			return 0;
		}
		if (n == 1) {
			return 1;
		}
		return fibonacci(n-1) + fibonacci(n-2);
	};

	return fibonacci;
});