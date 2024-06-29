import { Request, Response } from "express"

interface typeURL {
    url: string;
    mail?: string;
    shortUrl: string;
}

let urls: any = [
    {url: "https://www.google.cl", shortUrl: "AGE4DS", mail: "bpacheco@gmail.com"},
]


export class UrlController {

    constructor(
        // entity
    ) {}

    public getUrl = ( req: Request, res: Response ) => {
        // TODO: implementar en mongoDB
        const shortUrl = req.params.shorturl;
        const matchShortUrl = urls.find( (e:any) => e.shortUrl === shortUrl );
        if (!matchShortUrl) {
            res.json('MALO');
            return;
        }

        return res.json(matchShortUrl.url);
        // res.redirect(matchShortUrl.url);
    }

    
    public createShortUrl = ( req: Request, res: Response) => {
        // TODO: implementar en mongoDB
        let url = req.params.url;
        
        if (!url.startsWith("https://")) {
            url = `https://${url}`;
        }
        
        const mail = req.header("mail");
        urls.push( {url: url, shorUrl: "asdasasd", mail: mail} );
        
        return res.json(urls);
    }

    public getUrlsById = ( req: Request, res: Response) => {



    }    
    
    public deleteUrl = ( req: Request, res: Response) => {
        // TODO: implementar en mongoDB
        const url = req.params.url;
        const mail = req.header("mail");
        const matchUrl = urls.find( (e:any) => e.url === url );

        if ( matchUrl && matchUrl.mail === mail) {
            const index = matchUrl.mail.indexOf(mail);
            urls.splice(index, 1);
        }
        
        return res.json(urls);
    }

}