const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const csrf = require("csurf");
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const url = require("url");

// const dbConnect = require('./config/database');
const webRoutes = require("./routes/web");
const apiRoutes = require("./routes/api");

const app = express();

app.set("view engine", "ejs");
app.set("views", "resource/views");

const corsOpts = {
  origin: "*",

  methods: ["GET", "POST"],

  allowedHeaders: ["Content-Type", "x-access-token"],
};

app.use(cors(corsOpts));

app.use(express.json());
// app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const protect = csrf({ cookie: true });

app.use(
  session({
    name: "my-session-name",
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: false,
    cookie: {
      /*maxAge: 60000*/
    },
    // cookie: { secure: true, httpOnly: true }
  })
);
app.use(flash());

const ignore = [
  "/api/register",
  "/api/login",
  "/api/generate-otp",
  "/api/otp-login",
  "/api/check-user",
  "/api/eligiblity-form",
  "/api/submit-test",
  "/api/payment/orders",
  "/api/payment/verify",
  "/api/update-profile",
  "/api/document-upload",
  "/api/scholarship-test-submit",
  "/api/store-contact",
  "/api/direct-placement-store-details"
];

app.use((req, res, next) => {
  if (ignore.includes(req.url)) {
    next();
  } else {
    protect(req, res, next);
  }
});

app.use((req, resp, next) => {
  if (req.csrfToken) {
    resp.locals.csrfToken = req.csrfToken();
  }
  resp.locals.auth = req.session.auth ? req.session.auth : false;
  resp.locals.username = req.session.username ? req.session.username : "";
  resp.locals.roles = req.session.roles ? req.session.roles : "";
  resp.locals.routeName = req.originalUrl.split("/")[1];
  resp.locals.message = req.flash();
  resp.locals.pathname = url.parse(req.url).pathname;

  next();
});

app.use(webRoutes);
app.use(apiRoutes);

app.use((req, resp, next) => {
  // resp.status(404).sendFile(path.join(__dirname,'views','errors','404.html'));
  resp.status(404).render("errors/404");
});

app.use((error, req, resp, next) => {
  // resp.status(404).sendFile(path.join(__dirname,'views','errors','404.html'));
  if (ignore.includes(req.url)) {
    resp.status(500).json({ error: error });
  } else {
    resp.status(500).render("errors/500", {
      error: error,
    });
  }
});

app.listen(8001);

// const http = require('http');
//Core way of http server initialization
// const test = (req,res) => {
//     res.write("<h1>Hi I am  here</h1>");
//     return res.end();
// }

// const server = http.createServer(test);
// server.listen(8000);
