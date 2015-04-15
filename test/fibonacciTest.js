define(['src/fibonacci', 'mocha', 'chai'], function (fb, mocha, chai) {
	var should = chai.should();
	describe('test fibonacci', function () {
		it('should equal 55 when n === 10', function () {
			fb(10).should.equal(55);
		});

		it('should equal 0 when n === 0', function () {
            fb(0).should.equal(0);
        });

        it('should equal 1 when n === 1', function () {
            fb(1).should.equal(1);
        });

        it('should throw when n < 0', function () {
            (function () {
                fb(-1);
            }).should.throw('n should >= 0');
        });

        it('should throw when n isnt Number', function () {
            (function () {
                fb('hr');
            }).should.throw('n should be a Number');
        });
	});
});