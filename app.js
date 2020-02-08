var express      = require("express");
var app          = express();
var mongoose     = require("mongoose");
var bodyParser   = require("body-parser");

mongoose.connect("mongodb://localhost/recipes_db", {useNewUrlParser:true,useUnifiedTopology:true});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

//Mongoose schema 

var recipeSchema = new mongoose.Schema({
	title: String,
	image: String,
	body : String,
	created: {type:Date, default:Date.now}
});

var Recipe = mongoose.model("Recipe", recipeSchema);

//Routes
app.get("/", function(req,res){
	res.render("landing");
});

// INDEX ROUTE 

app.get("/recipes", function(req,res){
	Recipe.find({}, function(err, foundRecipe){
		if(err){
			console.log(err);
		} else {
			res.render("landing" , {recipes:foundRecipe});
		}
	});
});

//NEW ROUTE 

app.get("/recipes/new" , function(req,res){
	res.render("new");
});

//CREATE ROUTE 

app.post("/recipes", function(req,res){
	Recipe.create(req.body.recipe , function(err, newRecipe){
		if(err){
			res.render("new");
		}else{
			res.redirect("/recipes");
		}
	});
});


app.listen(3000, function(){
	console.log("server started");
});