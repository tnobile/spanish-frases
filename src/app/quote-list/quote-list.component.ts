import { Component, OnInit } from '@angular/core';
import { QuoteService } from 'src/app/quote.service';
import { Quote } from 'src/app/quote.model';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.css']
})
export class QuoteListComponent implements OnInit {

  quotes: Quote[] = [];

  constructor(private quoteService: QuoteService) { }

  ngOnInit() {
    this.quoteService.getQuotes().subscribe(data => {
      //data.forEach(d => {
      //  const q = d as Quote;
      //  console.log("Got " + q.id);
      //  this.quotes.push(d as Quote);
      //});
      this.quotes = data;
    });

    this.create({ id: "1", name: "ta", quote: "what:s", })
    this.create({ id: "2", name: "ta", quote: "what:s", })
  }

  create(quote: Quote) {
    this.quoteService.createQuote(quote);
  }
  delete(id: string) {
    console.log(`deleting ${id}`);
    this.quoteService.deleteQuote(id);
  }

  update(quote: Quote) {
    this.quoteService.updateQuote(quote);
  }

}
