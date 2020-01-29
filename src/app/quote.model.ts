export class Quote {
    id: string;
    name: string;
    quote: string;
    at: string;

    constructor(name: string, quote: string) {
        this.name = name;
        this.quote = quote;
        this.at = new Date().toUTCString();
    }
}
