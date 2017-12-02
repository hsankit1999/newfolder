var moment=require('moment');
var generateMsg=function(from,text) {
    return {
        from:from,
        text:text,
        createdAt:moment().format('H:mm a')
    };
};

module.exports={generateMsg};