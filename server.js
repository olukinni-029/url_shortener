import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './Database/db.js';
import path from "path";
import ejs from "ejs";
import { nanoid } from 'nanoid';
import URL from './model/urlModel.js';
import validateURL from './middleware/validate_url.js';

const __dirname = path.resolve();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
// connectDB(process.env.URL);
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Get the homepage
app.get("/", (req, res) => {
    res.render(__dirname + "/public/index.ejs");
  });

//   Post the link
  app.post("/link", validateURL, async(req, res) => {
    try{ 
    const { url } = req.body;
    const checkUrlExist = await URL.findOne({url});
    if(checkUrlExist){
       return res.status(400).json("The url has been shorten before");
    }
    // Generate a unique id to identify the URL
    const id = nanoid(7);
  
    const newURL = await URL.create({ url, id });
    const shortenedUrl = `http://localhost:2450/${newURL.id}`;
      // The shortened link: our server address with the unique id
      res.render(__dirname + "/public/shortenUrl.ejs",{ shortenedUrl: shortenedUrl});
    } catch (error) {
      res.status(500).json("An error was encountered! Please try again.");
    }
  });

  
//   Redirecting the user
app.get("/:id", async (req, res) => {
    try{
        const id = req.query.id;
        const originalLink = await URL.findOne({ id });
        if (!originalLink) {
            // res.status(404).send('URL not found');
            return res.render(__dirname + "/public/404.ejs");
        }
        res.redirect(originalLink.url);
    }catch(error){
        res.status(500).json("An error was encountered! Please try again.");
    }
  });

const port = process.env.PORT||8080;

app.listen(port,async()=>{
    try {
        await connectDB(process.env.URL);
        console.log("Database is running successful");
        console.log(`Server listening on http://localhost:${port}`);
      } catch (error) {
        console.log(error.message);
      }
});