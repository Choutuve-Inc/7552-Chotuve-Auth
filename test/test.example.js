const assert = require('assert');
var request = require('supertest');

describe('loading express', function () {
  var app;
  beforeEach(function () {
    app = require('../server');
  });

  afterEach(function () {
    app.close();
  });



  it('responds 200 to /ping', function testSlash(done) {
  request(app)
    .get('/ping')
    .expect(200, done);
  });
 

  it('responds 200 to good /create', function testSlash(done) {
  request(app)
    .post('/create')
    .send({"email":"dumiMail@Dumi.com","password":"dumi","tipo":"mailPass",
    	"image":"https://firebasestorage.googleapis.com/v0/b/chotuve-android-media.appspot.com/o/userPic%2F7e08599a-87c1-408a-92c0-a100f3af7ae8?alt=media&token=f32c710f-271f-4233-8294-9576c0d3c101",
    	"phone": "+541536701234","username":"dumi"})
    .expect(200, done);
  });

  it('responds 404 to bad /create', function testSlash(done) {
  request(app)
    .post('/create')
    .send({"email":"dumimail@dumi.com","password":"dumi","tipo":"mailPass",
    	"image":"https://firebasestorage.googleapis.com/v0/b/chotuve-android-media.appspot.com/o/userPic%2F7e08599a-87c1-408a-92c0-a100f3af7ae8?alt=media&token=f32c710f-271f-4233-8294-9576c0d3c101",
    	"phone": "+541536701234","username":"dumi"})
    .expect(404, done);
  });

 it('responds 404 to /login', function testSlash(done) {
  request(app)
    .post('/login')
    .send({"email":"dumimail@dumi.com"})
    .expect(404, done);
  });
  
  it('responds 400 to /login(device)', function testSlash(done) {
  request(app)
    .post('/login')
    .send({"device":"asdaasdasd"})
    .expect(404, done);
  });

  it('responds 200  /login', function testSlash(done) {
  request(app)
    .post('/login')
    .send({"email":"dumimail@dumi.com","password":"dumi","tipo":"mailPass","device":"asd"})
    .expect(200, done);
  });  

  it('responds 200 to /login(device)', function testSlash(done) {
  request(app)
    .post('/login')
    .send({"device":"asd"})
    .expect(200, done);
  });

  it('responds 204 to /logout(email)', function testSlash(done) {
  request(app)
    .post('/logout')
    .send({"email":"titonoolvida2@gmail.com"})
    .expect(204, done);
  });

  it('responds 200  /login(admin)', function testSlash(done) {
  request(app)
    .post('/login')
    .send({"email":"admin@a.com","password":"a","tipo":"admin"})
    .expect(200, done);
  });

  it('responds 204 to /logout(admin)', function testSlash(done) {
  request(app)
    .post('/logout')
    .send({"email":"admin@a.com"})
    .expect(204, done);
  });

  it('responds 204 to /logout(device)', function testSlash(done) {
  request(app)    
  	.post('/login')
    .send({"email":"dumimail@dumi.com","password":"dumi","tipo":"mailPass","device":"asd"})
    .expect(200);
  request(app)    
    .post('/logout')
    .send({"email":"dumimail@dumi.com"})
    .expect(204, done);
  });




  it('responds 200 to get /data/seen', function testSlash(done) {
  request(app)
    .get('/data/seen')
    .expect(200, done);
  });  
  it('responds 200 to get /data/join', function testSlash(done) {
  request(app)
    .get('/data/join')
    .expect(200, done);
  });
  it('responds 200 to get /users', function testSlash(done) {
  request(app)
    .get('/users')
    .expect(200, done);
  });  
  it('responds 200 to get /users/uid', function testSlash(done) {	 
  request(app)     
  .post('/login')
  .send({"email":"dumimail@dumi.com","password":"dumi","tipo":"mailPass","device":"asd"})
  .then(function(res) {
  	request(app)  
    .get('/users/'+res.body.uid)
    .expect(200, done);
  	})
  });  

  it('responds 404 to post /key', function testSlash(done) {
  request(app)
    .post('/key')
    .send({"email":"dumi@Dumi.com"})
    .expect(404, done);
  });

  it('responds 200 to post /key', function testSlash(done) {
  request(app)
    .post('/key')
    .send({"email":"titonoolvida@gmail.com"})
    .expect(200, done);
  });

 it('responds 200 to get /key/uid', function testSlash(done) { 
  request(app)     
  .post('/login')
  .send({"email":"dumimail@dumi.com","password":"dumi","tipo":"mailPass","device":"asd"})
  .then(function(res) {
  request(app)
    .get('/key/' + res.body.uid)
    .expect(200, done);
	})
  });


 it('responds 404 to reset /reset', function testSlash(done) {
  request(app)
    .post('/reset')
    .send({"email":"dumimail@dumi.com","password":"dumi","tipo":"mailPass"})
    .expect(404, done);
  });

 it('responds 200 to reset /reset', function testSlash(done) {
  request(app)     
  .post('/login')
  .send({"email":"dumimail@dumi.com","password":"dumi","tipo":"mailPass","device":"asd"})
  .then(function(res) {
  	request(app)  
    .post('/reset')
    .send({"email":"dumimail@dumi.com","Npassword":"dumi","tipo":"mailPass","token":res.body.token.substring(0,7)})
    .expect(200, done);
  	})
  });


  it('responds 200 to get /users/uid1+uid2', function testSlash(done) {
  request(app)     
  .get('/users')
  .then(function(res) {
  	request(app)  
    .get('/users/?list='+res.body[0].uid+res.body[1].uid)
    .expect(200, done);
  	})
  });  


 it('responds 200 to patch /users/uid', function testSlash(done) {
  request(app)     
  .post('/login')
  .send({"email":"dumimail@dumi.com","password":"dumi","tipo":"mailPass","device":"aasdasdsd"})
  .then(function(res) {
  	request(app)  
    .patch('/users/'+res.body.uid)
    .send({"Nusername":"NOLA"})
    .expect(200, done);
  	})
  });

 it('responds 200 to patch /users/uid', function testSlash(done) {
  request(app)     
  .post('/login')
  .send({"email":"dumimail@dumi.com","password":"dumi","tipo":"mailPass","device":"aasdasdsd"})
  .then(function(res) {
  	request(app)  
    .patch('/users/'+res.body.uid)
    .send({"Nphone":"+541536705670"})
    .expect(200, done);
  	})
  });

 it('responds 200 to patch /users/uid', function testSlash(done) {
  request(app)     
  .post('/login')
  .send({"email":"dumimail@dumi.com","password":"dumi","tipo":"mailPass","device":"aasdasdsd"})
  .then(function(res) {
  	request(app)  
    .patch('/users/'+res.body.uid)
    .send({"Nimage":"https://firebasestorage.googleapis.com/v0/b/chotuve-android-media.appspot.com/o/userPic%2F7e08599a-87c1-408a-92c0-a100f3af7ae8?alt=media&token=f32c710f-271f-4233-8294-9576c0d3c101"})
    .expect(200, done);
  	})
  });



 it('responds 409 to patch /users/uid', function testSlash(done) {
  request(app)     
  .post('/login')
  .send({"email":"dumimail@dumi.com","password":"dumi","tipo":"mailPass","device":"aasdasdsd"})
  .then(function(res) {
  	request(app)  
    .patch('/users/'+res.body.uid)
    .send({"Nemail":"titonoolvida@gmail.com"})
    .expect(409, done);
  	})
  }); 

 it('responds 200 to patch /users/uid', function testSlash(done) {
  request(app)     
  .post('/login')
  .send({"email":"dumimail@dumi.com","password":"dumi","tipo":"mailPass","device":"aasdasdsd"})
  .then(function(res) {
  	request(app)  
    .patch('/users/'+res.body.uid)
    .send({"Nemail":"dumimail1@dumi.com"})
    .expect(200, done);
  	})
  });


 it('responds 200 to patch /users/uid', function testSlash(done) {
  request(app)     
  .post('/login')
  .send({"email":"dumimail1@dumi.com","password":"dumi","tipo":"mailPass","device":"notasd"})
  .then(function(res) {
  	request(app)  
    .patch('/users/'+res.body.uid)
    .send({"Nemail":"dumimail@dumi.com"})
    .expect(200, done);
  	})
  });


 it('responds 200 to post /token', function testSlash(done) {
  request(app)     
  .post('/login')
  .send({"email":"dumimail@dumi.com","password":"dumi","tipo":"mailPass","device":"asd"})
  .then(function(res) {
  	request(app)  
    .post('/token')
    .send({"JWT":res.body.token})
    .expect(200, done);
  	})
  });

 it('responds 404 to post /token', function testSlash(done) {
  request(app)     
  .post('/login')
  .send({"email":"dumimail@dumi.com","password":"dumi","tipo":"mailPass","device":"asd"})
  .then(function(res) {
  	request(app)  
    .post('/token')
    .send({"JWT":"asd"})
    .expect(404, done);
  	})
  });

 it('responds 404 to post /token', function testSlash(done) {
  request(app)     
  .post('/login')
  .send({"email":"dumimail@dumi.com","password":"dumi","tipo":"mailPass","device":"asd"})
  .then(function(res) {
  	request(app)  
    .post('/token')
    .send({})
    .expect(404, done);
  	})
  });



 it('responds 200 to delete /users/uid', function testSlash(done) {
  request(app)     
  .post('/login')
  .send({"email":"dumimail@dumi.com","password":"dumi","tipo":"mailPass","device":"asdasd"})
  .then(function(res) {
   	request(app)  
    .delete('/users/'+res.body.uid)
    .expect(200, done);
  	})
  });



  it('404 wrong url', function testPath(done) {
    request(app)
      .get('/foo/bar')
      .expect(404, done);
  });
});

