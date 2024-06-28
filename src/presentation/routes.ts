import { Router } from 'express';
import { UrlRoutes } from './url/routes';
import { UrlHandlerRoutes } from './urlHandler/routes';




export class AppRoutes {


    static get routes(): Router {

        const router = Router();
    
        // Definir las rutas
        router.use('/api/url', UrlRoutes.routes );
        router.use('', UrlHandlerRoutes.routes)



        return router;
    }


}