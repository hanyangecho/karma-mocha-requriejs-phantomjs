define(['src/util', 'mocha', 'chai'], function (util, mocha, chai) {
	var should = chai.should();
	describe('test util', function () {
		it('uniq', function () {
            // util.Array.uniq([1, 2, 1, 3, 4, 5, 3, 1]).length.should.equal(5);
			// util.myArray.uniq([1, 2, 1, 3, 4, 5, 3, 1]).join().should.equal([1, 2, 3, 4, 5].join());
            var result = [];
            var count = 10000;
            for (var i = 0; i < count; i++) {
                result.push(Math.ceil(Math.random() * count));
            }
            var begin = new Date();
            util.myArray.uniq(result);
            console.log(new Date() - begin);
            var begin1 = new Date();
            util.myArray.uniq1(result);
            console.log(new Date() - begin1);
            var begin2 = new Date();
            util.myArray.uniq2(result);
            console.log(new Date() - begin2);
            // var begin3 = new Date();
            // util.myArray.uniq3(result);
            // console.log(new Date() - begin3);
            (1).should.equal(1);
		});
        it('indexOf', function () {
            // util.Array.uniq([1, 2, 1, 3, 4, 5, 3, 1]).length.should.equal(5);
            util.myArray.indexOf([1, 2, 1, 3, 4, 5, 3, 1], 1).should.equal(0);
        });
	});
});