import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Quote } from 'src/app/quote.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  quotes$: Observable<any[]>;
  quotesRef: AngularFireList<any>;
  quoteRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  getQuotes() {
    this.quotesRef = this.db.list('/quotes');
    this.quotes$ = this.quotesRef.snapshotChanges().pipe(
      map(changes =>
        //changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        changes.map(c => ({ id: c.payload.key, name: c.payload.val().name, quote: c.payload.val().quote }))
      )
    );
    return this.quotes$;
  }

  createQuote(quote: Quote): void {
    this.quotesRef.push(quote)
      .catch(error => this.handleError(error));
  }

  updateQuote(quote: Quote) {
    this.quoteRef = this.db.object('/quotes/' + quote.id);
    this.quoteRef.update(quote)
      .catch(error => this.handleError(error));
  }

  deleteQuote(quoteId: string) {
    console.log(`really dd ${quoteId}`);
    this.quoteRef = this.db.object('/quotes/' + quoteId);
    this.quoteRef.remove()
      .then(() => {
        console.log("New poll data sent!")
      })
      .catch(error => this.handleError(error));
  }

  // Default error handling for all actions
  private handleError(error) {
    console.log(error);
  }
}
