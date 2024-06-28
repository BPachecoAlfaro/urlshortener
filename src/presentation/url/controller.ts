import { Request, Response } from "express"

interface typeURL {
    url: string;
    mail?: string;
    shortUrl: string;
}

let urls: any = [
    {url: "google.cl", shorUrl: "AGE4DS", mail: "bpacheco@gmail.com"},
]


export class UrlController {

    constructor(
        // entity
    ) {}
    
    public createUrl = ( req: Request, res: Response) => {
        let url = req.params.url;
        if (!url.startsWith("https://")) {
            url = `https://${url}`
        }
        const mail = req.header("mail")
        urls.push( {url: url, shorUrl: "asdasasd", mail: mail} )
        return res.json(urls)
    }

    public deleteUrl = ( req: Request, res: Response) => {
        const url = req.params.url;
        const mail = req.header("mail")
        const matchUrl = urls.find( (e:any) => e.url === url )

        if ( matchUrl && matchUrl.mail === mail) {
            const index = matchUrl.mail.indexOf(mail)
            urls.splice(index, 1);
        }
        
        return res.json(urls)
    }

}