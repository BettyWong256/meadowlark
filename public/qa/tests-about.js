suite('"About" page Tests',function(){
	test('page should contain link to contack page',function(){
		assert($('a[href="/"]').length);
	});
});