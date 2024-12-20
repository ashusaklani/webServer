import { Router } from "express";
import { homePage } from "../controllers/homePage.controllers.js";
const homeRouter=Router();
console.log(homePage)
homeRouter.route('/').get(homePage)


export default homeRouter