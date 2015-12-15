      function faceplustest(){
        /*unirest.get("https://faceplusplus-faceplusplus.p.mashape.com/detection/detect?url=http%3A%2F%2Fwww.faceplusplus.com%2Fwp-content%2Fthemes%2Ffaceplusplus%2Fassets%2Fimg%2Fdemo%2F1.jpg")
      .header("X-Mashape-Key", "yY96TlYlEQmsh198oKUwuuapvo6np1Y7trEjsnHVW5zfhbuZuY")
      .header("Accept", "application/json")
      .end(function (result) {
        console.log(result.status, result.headers, result.body);
      });}*/
      /*var FacePlusPlus = require('faceplusplus');
      var config ={
        api_key:'X-Mashape-Key',
        api_secret:'yY96TlYlEQmsh198oKUwuuapvo6np1Y7trEjsnHVW5zfhbuZuY'
        
      }
      var client = new FacePlusPlus(config);
      client.post('person/create',{person_name:'Somebody'},function(err,response,body){
        console.log(body);
        });*/
       alert("hello");
       
        var fpp=require('face-plus-plus');
        
        fpp.setApiKey('X-Mashape-Key');
        fpp.setApiSecret('yY96TlYlEQmsh198oKUwuuapvo6np1Y7trEjsnHVW5zfhbuZuY');
        
        var parameters = {
          url:'',
          attribute:'gender,age'
        };
        fpp.get('detection/detect',parameters, function(err,res){
          console.log(res);
        });
	  }