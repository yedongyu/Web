var express= require("express")
var router=express.Router({mergeParams:true});
var Campground=require("../models/campground");
var Comment=require("../models/comment");
var middleware=require("../middleware");   //index.js 是一个特殊文件，如果文件夹里面有这个文件，引用文件夹会自动引动index.js的内容

//comments new
router.get("/new",middleware.isLoggedIn,function(req,res){
    //find campground by id
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }else{
            res.render("comment/new",{campground:campground});
        }
    })
})
//comments create
router.post("/",middleware.isLoggedIn,function(req,res){
    //look up campground using ID
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            //create new comment
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    req.flash("error","Something wrong");
                    console.log(err);
                }else{
                    //add username and id to comment
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    //save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success","Successfully added comment");
                    res.redirect('/campgrounds/'+campground._id);
                }
            });
        }
    });
});
//comment edit route
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            res.redirect("back");
        }else{
            res.render("comment/edit",{campground_id:req.params.id,comment:foundComment});
        }
    })
});
//comment update route
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,UpdatedComment){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
});
//comment destroy route
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect("back");
        }else{
            req.flash("success","Comment deleted");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });   //记住在app中已有一个id,所有req.params.id是campground的id，req.params.comment_id是上面传进去路由的comment_id
})

module.exports=router;