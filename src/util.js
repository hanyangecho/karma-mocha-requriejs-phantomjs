define(function () {
	return {
		myArray: {
			uniq: function (arr) {
				// 1
				// var newArr = orgArr.slice(0);
				// var len = newArr.length;
				// for (var i = 0; i < len; i++) {
				// 	for (var j = i + 1; j < len; j++) {
				// 		if (newArr[i] === newArr[j]) {
				// 			newArr.splice(j, 1);
				// 		}						
				// 	}
				// }
				// 2
				// var begin = new Date();
				// var newArr = [];
				// for (var i = 0, item; (item = arr[i++]); ) {
				// 	// if (newArr.indexOf) {
				// 		if (newArr.indexOf(item) === -1) {
				// 			newArr.push(item);
				// 		}	
				// 	// } else {
				// 	// 	if (this.indexOf(newArr, item) === -1) {
				// 	// 		newArr.push(item);
				// 	// 	}
				// 	// }
				// }
				// console.log((new Date) - begin);
				// return newArr;
				
				// 3
				var newArr = arr.filter(function (item, index) {
					return arr.indexOf(item, index + 1) === -1 ;
				});

				return newArr;
				// 4
				// var begin = new Date();
				// var result = [];
			 //    var hasItem = {};
			 //    for (var i = 0, len = arr.length; i < len; i++) {
			 //        if (!hasItem[arr[i]]) {
			 //            result.push(arr[i]);
			 //            hasItem[arr[i]] = true;
			 //        }
			 //    }
			    // console.log((new Date) - begin);
			    // return result;
				
			},
			uniq1: function (orgArr) {
			    var result = [];
			    var hasItem = {};
			    for (var i = 0, item; (item = orgArr[i++]);) {
			        if (!hasItem[item]) {
			            result.push(item);
			            hasItem[item] = true;
			        }
			    }
			    return result;
			},
			uniq2: function (orgArr) {
			    var newArr = [];
			    if (newArr.indexOf) {
			        for (var i = 0, item; (item = orgArr[i++]); ) {
			            if (newArr.indexOf(item) === -1) {
			                newArr.push(item);
			            }
			        }
			    } 
			    return newArr;
			},
			uniq3: function (orgArr) {
				var indexOf;
			    var newArr = [];
			    if (indexOf = this.indexOf) {
			        for (var i = 0, item; (item = orgArr[i++]); ) {
			            if (indexOf(newArr, item) === -1) {
			                newArr.push(item);
			            }
			        }
			    }
			    return newArr;
			},
			indexOf: function (arr, item) {
				console.log(this);
				for (var i = 0, tpm; (tpm = arr[i++]); ) {
					if (tpm === item) {
						return --i;
					}						
				}
				return -1;
			}
		}
	};
});