import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuoteService } from '../quote.service';
import { Quote } from '../quote.model';
import { Location } from '@angular/common';
import { QuoteListComponent } from '../quote-list/quote-list.component';

//import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quote-detail',
  templateUrl: './quote-detail.component.html',
  styleUrls: ['./quote-detail.component.css']
})
export class QuoteDetailComponent implements OnInit {

  quote: Quote;

  constructor(
    private route: ActivatedRoute,
    private quoteService: QuoteService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getQuote();
  }

  getQuote() {
    const id = this.route.snapshot.paramMap.get('id');
    //this.route.params.take(1).subscribe(param => key = param["id"]);
    this.quoteService.getQuote(id)
      .subscribe(quote => {
        if (JSON.stringify(quote) !== '{}') {
          console.log(`detail : ${Object.values(quote)}`);
          this.quote = quote;
        } else {
          this.location.back();
        }
      });
  }

  update() {
    this.quote.at = new Date().toUTCString();
    this.quoteService.updateQuote(this.quote);
  }

  goBack() {
    this.location.back();
  }
}
