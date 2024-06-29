import { Router } from 'express';
import { UrlRoutes } from './url/routes';




export class AppRoutes {


    static get routes(): Router {

        const router = Router();
    
        // Definir las rutas
        router.use('', UrlRoutes.routes );



        return router;
    }


}