const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
var cookieParser = require("cookie-parser");

//Db connection building with sql / sequilize
const db = require("./model/index");

require("dotenv").config();
db.sequelize.sync({ force: 0 });
app.use(cookieParser());

//Data transfering configuration from frontend to backend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//CORS
const corsOptions = {
  origin: "http://localhost:8080",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

//Seeding initial Database with Admin
const ADMIN_SEEDER = require("./seeder");
app.use(ADMIN_SEEDER);

//api calling
const authApi = require("./api/auth/auth");
const userApi = require("./api/user/user");

const categoryApi = require("./api/user/category");
const cityApi = require("./api/user/city");
const jobApi = require("./api/user/job");
const blogApi = require("./api/user/blog");
const appliedJobApi = require("./api/user/appliedJob");
const profileApi = require("./api/user/profile");

const contactApi = require("./api/user/contact");


app.use(express.static(path.join(__dirname, "uploads")));
//api integration
app.use("/api", authApi);
app.use("/api", userApi);
app.use("/api/job", jobApi);
app.use("/api", categoryApi);
app.use("/api/city", cityApi);
app.use("/api/blog", blogApi);
app.use("/api/appliedJob", appliedJobApi);
app.use("/api/getMe", profileApi);
app.use("/api/contact", contactApi);


app.listen(3000, () => {
  console.log("App is running on port 3000");
});
