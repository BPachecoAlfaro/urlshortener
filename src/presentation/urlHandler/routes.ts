import { Router } from "express";
import { UrlHandlerController } from "./controller";


export class UrlHandlerRoutes {

    static get routes(): Router {

        const router = Router();

        const urlHandlerController = new UrlHandlerController();

        router.get('/:shorturl', urlHandlerController.getUrl )


        return router;
    }


}