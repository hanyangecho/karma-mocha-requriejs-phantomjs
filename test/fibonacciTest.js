define(['src/fibonacci', 'mocha', 'chai'], function (fb, mocha, chai) {
	var should = chai.should();
	describe('test fibonacci', function () {
		it('should equal 55 when n === 10', function () {
			fb(10).should.equal(55);
		});
	});
});