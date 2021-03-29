function createData(name, calories, carbs, protein) {
	return { name, calories, carbs, protein };
}

const rows = [createData('Jhony', 504, 67, 4.3)];

var foo = rows[0];
//Object.prototype.foobie = 'bletch'; // add property to foo that won't be counted

var count = 0;
for (var k in foo) {
	if (foo.hasOwnProperty(k)) {
		console.log(k);
		++count;
	}
}
console.log('Found ' + count + ' properties specific to foo');
