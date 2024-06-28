import { Request, Response } from "express"

let urls: any = [
    {url: "htpps:www.youtube.com/", shorUrl: "AGE4GAW", mail: "bpacheco@gmail.com"},
    {url: "https://www.google.cl", shorUrl: "ASDFG"}
]




export class UrlHandlerController {

    constructor(
        // entity
    ) {}

    public getUrl = ( req: Request, res: Response ) => {
    
        const shortUrl = req.params.shorturl;
        const matchShortUrl = urls.find( (e:any) => e.shorUrl === shortUrl );
        if (!matchShortUrl) {
            res.json('MAlO')
            return
        }
        res.redirect(matchShortUrl.url);
    }

}