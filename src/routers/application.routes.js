import { Router } from "express";
import { ledStateControl,rgbValControl,ledControlVal,rgbStateControl,ultrasonicControl} from "../controllers/application.controllers.js";
const applicationRouter=Router();
applicationRouter.route('/ledStateControl').post(ledStateControl)
applicationRouter.route('/ledValControl').post(ledControlVal)
applicationRouter.route('/rgbStateControl').post(rgbStateControl)
applicationRouter.route('/rgbValControl').post(rgbValControl)
applicationRouter.route('/ultrasonicStateControl').post(ultrasonicControl);
export default applicationRouter 