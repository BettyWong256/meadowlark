var express = require('express');
var http = require('http');
var fortune = require('./lib/fortune.js');   //相对于npm
var app = express();



// 创建视图引擎
// 指定默认布局{defaultLayout:'main'}，除非特殊指明，不然全用main.handlebars
// 特殊指明例：res.render('home',{layout:null/'unmain'})
var handlebars = require('express3-handlebars').create({
	defaultLayout:'main',
	// 段落-实例化是添加section辅助方法(script脚本)
	helpers:{
		section: function(name, options){
			if(!this._sections) this._sections = {};
			this._sections[name] = options.fn(this);
			return null;
		}
	}
});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

// 指定程序端口方式
app.set('port',process.env.PORT|| 3000);

// ?test=1为测试页面
app.use(function(req,res,next){
	res.locals.showTests = app.get('env') !== 'production' && req.query.test ==='1';
	next();
});

// 引入基本文件
app.use(express.static(__dirname + '/public'));


// 中间件
app.use(function(req,res,next){
	if(!res.locals.partials) res.locals.partials = {};
	res.locals.partials.weather = fortune.weather();
	res.locals.partials.weathers = fortune.weather();
	next();
});

app.use(require('body-parser')());




// 路由
app.get('/',function(req,res){
	// res.type('text/plain');
	// res.send('GodKing');
	res.render('home');
});

//-----段落-页面引用js脚本--------------
app.get('/jqueryTest',function(req,res){
	// res.type('text/plain');
	// res.send('GodKing');
	res.render('jquerytest');
})
//------hds客户端-动态加载页面内容--------------
app.get('/nursery-rhyme',function(req,res){
	res.render('nursery-rhyme');
});

app.get('/data/nursery-rhyme',function(req,res){
	res.json({
		animal :'squirrel',
		bodyPart: 'taile',
		adjective: 'bushy',
		noun: 'heck'
	});
});

//---------express表单------------------
app.get('/newsletter',function(req,res){
	res.render('newsletter',{csrf:'CSRF token goes here'});
});
app.post('/process',function(req,res){
	console.log('From(from querystring):' + req.query.form);
	console.log('CSRF token (form hidden from field):' + req.body._csrf);
	res.redirect(303,'/thank-you');
});
//---------普通页面controller---------------
app.get('/about',function(req,res){
	// res.type('text/plain');
	// res.send('About GodKing!');
	res.render('about',{
		fortune:fortune.getCake(),
		pageTestScript:'/qa/tests-about.js'
	});
});
app.get('/thank-you',function(req,res){
	 res.type('text/plain');
	 res.send('Thanks!');
})


app.get('/tour/hood-river',function(req,res){
	res.render('tours/hood-river');
});

app.get('/tour/request-group-rate',function(req,res){
	res.render('tours/request-group-rate');
});

app.get('/godKing',function(req,res){
	res.render('test',{
		query:{
			name : 'BettyWong',
			sex: 'lady'
		},
		arr: ['fat','beauty'],
		list: [
			{name:'Mario',relation:'husband'},
			{name:'OldWang',relation:'wife'}
		],
		string:"/about"
	});
});



// 定制404,500
app.use(function(req,res){
	// res.type('text/plain');
	// res.send('404-Not Found   GodKing');
	res.status(404);
	res.render('404');
});


app.use(function(err, req, res, next){
	console.error(err.stack);
	// res.type('text/plain');
	// res.send('500- Server Error    GodKing');
	res.status(500);
	res.render('500');

})



//监听
app.listen(app.get('port'),function(){
	console.log('Express started on http://localhost:'+ app.get('port') + '.');
});