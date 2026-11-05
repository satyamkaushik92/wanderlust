const express=require("express");
const router=express();
const session=require("express-session");
const flash=require("connect-flash");
const path = require("path");
router.set("view engine", "ejs");
router.set("views", path.join(__dirname, "../views"));

const sessionOptions={
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false
};
router.use(session(sessionOptions));
router.use(flash());

router.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next();
});

router.get("/register",(req,res)=>{
    let {name="Guest"}=req.query;
    req.session.name=name;
    if(name==="Guest"){
        req.flash("error","user not register");
    } else {
        req.flash("success","User register successfully");
    }
    res.redirect("/hello");
});
router.get("/hello",(req,res)=>{
    res.render("page.ejs",{name:req.session.name});
});

router.get("/set-session",(req,res)=>{
    res.send("Session set successfully");
});
// router.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     } else {
//         req.session.count = 1;
//     }
//     res.send(`Request count: ${req.session.count}`);
// });
 

//cookie-parser class

// const cookieParser=require("cookie-parser");

// router.use(cookieParser("secretcode"));

// router.get("/getsignedcookies",(req,res)=>{
//     res.cookie("color","red", { signed: true });
//     res.send("Cookie set successfully");
// });
// router.get("/verifysignedcookies",(req,res)=>{
//     console.log(req.signedCookies);
//     res.send("Signed cookies verified");
// });

// router.get("/getcookies",(req,res)=>{
//   res.cookie("username","John Doe");  
//   res.send("Cookies are enabled");
// });

// router.get("/greet",(req,res)=>{
//  let { username="satyam"}= req.cookies;
//     res.send(`Hello ${username}`);
// });

// router.get("/",(req,res)=>{
//   console.dir(req.cookies);  
//   res.send("Welcome to the home page");
// });


router.listen(3000, () => {
    console.log("Server is running on port 3000");
});