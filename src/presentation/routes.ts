import { Router } from 'express';
import { UrlRoutes } from './url/routes';
import { AuthRoutes } from './auth/routes';




export class AppRoutes {


    static get routes(): Router {

        const router = Router();
    
        // Definir las rutas
        router.use('', UrlRoutes.routes );
        router.use('/api/auth', AuthRoutes.routes)



        return router;
    }


}