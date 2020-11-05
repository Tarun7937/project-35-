//Create variables here

var database ;
var foodstock;
var foodcount;
var lastfedtime;
var dog , dogimg1,dogimg2;

function preload()
{
  //load images here
  dogimg1 = loadImage("images/dogImg.png")
  dogimg2 = loadImage("images/dogImg1.png")
}

function setup() {
      createCanvas(1000, 400);
      database = firebase.database();
      foodstock = database.ref('food');
      foodstock.on("value",readstock);

      dog = createSprite(800,200,50,50);
      dog.addImage(dogimg1);
      dog.scale = 0.2
    
      foodobj = new Food()
      feedbutton = createButton("feed the dog");
      feedbutton.position(700,95);
      feedbutton.mousePressed(feedDog)
      
      addfoodbutton =  createButton("add food");
      addfoodbutton.position(800,95);
      addfoodbutton.mousePressed(addFood)

 



}


function draw() {  
  background("blue")
 
 lasttimeRef = database.ref('fedtime');
 lasttimeRef.on("value",readtime);
foodobj.display();
  drawSprites();
  //add styles here
 
  fill(255,255,254);
  textSize(15);
  if(lastfedtime>=12){
    text("Last Feed : "+ lastfedtime%12 + " PM", 350,30);
   }else if(lastfedtime==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastfedtime + " AM", 350,30);
   }
 


}
function readstock(data){
  foodcount = data.val()
  console.log(foodcount);
  foodobj.foodstock = foodcount;

}

function writestock (count){
      if(count<0 ){
        count = 0
      }else{

    //count = count - 1
    database.ref('/').update({food:count})
    }

}

function readtime(data){
  lastfedtime = data.val()
  foodobj.fedtime = lastfedtime;
  console.log(lastfedtime)
 // console.log(foodcount);


}

function writetime (lasttime){
    database.ref('/').update({fedtime:lasttime})
  }

function feedDog(){
  dog.addImage(dogimg2);
  foodobj.foodstock--
  foodobj.fedtime = hour();
  database.ref('/').update({
    fedtime:foodobj.fedtime,
    food:foodobj.foodstock
  })
 // writetime(foodobj.fedtime)
 // writestock(foodobj.foodstock)
}

function addFood(){
  dog.addImage(dogimg1);
console.log(foodobj.foodcount);
  foodobj.foodstock++
  writestock(foodobj.foodstock)

}