import { Request, Response } from "express"
import { generateShortUrl } from "../../helpers/generateShortUrl";
import { UrlModel } from '../../data/mongo/models/url.model';
import { json } from "stream/consumers";

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

    public getUrl = async ( req: Request, res: Response ) => {
        // TODO: implementar en mongoDB
        const shortUrl = req.params.shorturl;

        try {
            const originalUrl = await UrlModel.findOne({ short_url: shortUrl });
            if (!originalUrl) {
                return res.json('Link not exist')
            }
            return res.redirect(originalUrl?.original_url!);
            
        } catch (error) {
            
        }
        // res.redirect(matchShortUrl.url);
    }

    
    public createShortUrl = async ( req: Request, res: Response) => {
        // TODO: implementar en mongoDB
        let url = req.params.url;
        if (!url.startsWith("https://")) {
            url = `https://${url}`;
        }

        try {
            let generatedShortUrl;
            let shortUrlExist;
            let attempts = 0;
            const maxAttempts = 4;

            while (attempts < maxAttempts) {
                generatedShortUrl = generateShortUrl();
                shortUrlExist = await UrlModel.findOne({ short_url: generatedShortUrl })

            if (!shortUrlExist) {
                const urlModel = new UrlModel({
                    original_url: url,
                    short_url: generatedShortUrl,
                    
                });
                await urlModel.save();
          
                return res.status(201).json(urlModel);
            }

            attempts += 1;
            }
      
        } catch ( error ) {
            res.status(500).json('Could not generate unique short URL. Please try again.');
        }
        
    }

    public getUrlsById = async( req: Request, res: Response) => {

        let urlId = req.params.urlid;

        try {
            const urlIdMatch = await UrlModel.findOne({ _id: urlId });
            if (!urlIdMatch) {
                return res.json('Link not exist')
            }
            return res.json(urlIdMatch);
            
        } catch (error) {
            
        }

    }  

    public getUrlsByUser = ( req: Request, res: Response) => {



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