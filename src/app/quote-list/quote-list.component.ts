import { Component, OnInit } from '@angular/core';
import { QuoteService } from 'src/app/quote.service';
import { Quote } from 'src/app/quote.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.css']
})
export class QuoteListComponent implements OnInit {

  quotes: Quote[] = [];
  selectedQuote: Quote;

  constructor(private quoteService: QuoteService, private router: Router) { }

  ngOnInit() {
    this.quoteService.getQuotes().subscribe(data => {
      this.quotes = data.reverse();
    });

    //this.create({ id: "1", name: "Tim Smith", quote: "coge el libro", at: new Date().toUTCString() });
    //this.create({ id: "2", name: "James Dean", quote: "practica español", at: new Date().toUTCString() });
  }

  create(quote: Quote) {
    console.log('adding: ' + JSON.stringify(quote));
    this.quoteService.createQuote(quote);
  }
  async delete(id: string, event: MouseEvent) {
    console.log(`deleting ${id}`, event);

    event.stopPropagation();
    await this.quoteService.deleteQuote(id);
  }

  update(quote: Quote) {
    this.quoteService.updateQuote(quote);
  }

  onSelected(quote: Quote) {
    console.log(`selected: ${JSON.stringify(quote)}`);
    this.selectedQuote = quote;
    this.router.navigate(['detail', quote.id]);
  }

  deleteAll() {
    this.quoteService.deleteAll();
  }
}
