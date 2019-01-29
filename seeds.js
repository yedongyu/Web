var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comment");
var data=[
        {
            name:"Clouds Rest",
            image:"https://farm3.staticflickr.com/2651/3776039854_6ca63217cd.jpg",
            description:"Australia has similar good-character rules to New Zealand. Manning's tour was due to start in Sydney on Sunday, but on Thursday event organizer Think Inc. said it had received a notice of intention from the Australian government to deny Manning entry"
        },
        {
            name:"Clouds Rest2",
            image:"https://farm2.staticflickr.com/1088/735425486_dbf1dccfc4.jpg",
            description:"Australia has similar good-character rules to New Zealand. Manning's tour was due to start in Sydney on Sunday, but on Thursday event organizer Think Inc. said it had received a notice of intention from the Australian government to deny Manning entry"
        },
        {
            name:"Clouds Rest3",
            image:"https://farm3.staticflickr.com/2898/14545138174_8d2d4a4dd9.jpg",
            description:"Australia has similar good-character rules to New Zealand. Manning's tour was due to start in Sydney on Sunday, but on Thursday event organizer Think Inc. said it had received a notice of intention from the Australian government to deny Manning entry"
        }
    ]
function seedDB(){
    //remove all campgrounds
    Campground.remove({},function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds");
        //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed,function(err,campground){
                if(err){
                    console.log(err);
                }else{
                    console.log("add a campground");
                    //add a few comments
                    Comment.create({
                        text:"This place is great, but I wish there is an Internet",
                        author:"Homer"
                    },function(err,comment){
                        if(err){
                            console.log(err);
                        }else{
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Create a new comment");
                        }
                    });
                }
            });
        });
    });
    
    
}

module.exports=seedDB;
