var mongoose = require('mongoose') ;

var db = mongoose.Schema;
var schema = new db ({
   room : {
      type : 'String' ,
      require : 'true'
   }
});

var room = mongoose.model('rooms',schema);
module.exports = room ;