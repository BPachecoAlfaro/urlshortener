import { Request, Response } from "express"
import { generateShortUrl } from "../../helpers/generateShortUrl";
import { UrlModel } from '../../data/mongo/models/url.model';

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
            originalUrl.clicks = originalUrl.clicks + 1;

            await originalUrl.save();

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

        let ids = req.body.ids;
        ids = JSON.parse(ids);
        if (!ids) return res.status(400).json({error: "Error"});

        try {
            const matchids = await UrlModel.find({ _id: {$in: ids}, user_id: null });
            return res.status(200).json(matchids);
            
        } catch (error) {
            res.status(500).json('Please try again.');
        }



    }

    public createShortUrlRegisteredUser = async( req: Request, res: Response) => {

        let url = req.body.url;
        const user = req.body.user;
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
                    user_id: user.id,
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

    public getUrlsByUser = async ( req: Request, res: Response) => {

        const user = req.body.user;

        try {
            const urlsFromUser = await UrlModel.find({ user_id: user.id });
            if (!urlsFromUser) return res.status(500).json({ Error: "Internal server error" });
            if (urlsFromUser.length === 0) return res.status(500).json({ Error: "No matches"})
            res.json(urlsFromUser);

        } catch (error) {
            res.status(500).json('Could not generate get urls');
        };
        
    }    

    public deleteUrl = async ( req: Request, res: Response) => {
        // TODO: implementar en mongoDB
        const url = req.params.shorturl;
        const user = req.body.user;

        try {
            const match = await UrlModel.findOne({ short_url: url });
            if (!match) return res.status(500).json({Error: "No matches"});

            if (match.user_id = user.id ) {
                const deletedMatch = await UrlModel.deleteOne({ short_url: url, user_id: user.id });
                res.json(deletedMatch);
            }

        } catch (error) {
            res.status(500).json('Could not delete short URL. Please try again.');
        };


    };

};