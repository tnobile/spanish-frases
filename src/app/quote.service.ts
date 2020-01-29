import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Quote } from 'src/app/quote.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  quotes$: Observable<any[]>;
  quotesRef: AngularFireList<any>;

  quote$: Observable<any>;
  quoteRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  getQuotes() {
    this.quotesRef = this.db.list('/quotes');
    this.quotesRef = this.db.list('/quotes', ref => ref.orderByChild('at'))
    this.quotes$ = this.quotesRef.snapshotChanges().pipe(
      map(changes =>
        //changes.map(c => ({ id : c.payload.key, ...c.payload.val() }))
        changes.reverse().map(c => ({
          id: c.payload.key,
          name: c.payload.val().name,
          quote: c.payload.val().quote,
          at: c.payload.val().at
        }))
      )
    );
    return this.quotes$;
  }

  getQuote(id: string): Observable<Quote> {
    console.log("get:" + id);
    this.db.database.ref('/quotes/' + id).once('value', snapshot => {
      if (snapshot == null) {
        console.log("doesn:t exist:" + snapshot);
      } else {
        //console.log("got:" + JSON.stringify(snapshot));
        console.log("got:" + Object.values(snapshot));
      }
    });
    this.quoteRef = this.db.object('/quotes/' + id);
    this.quote$ = this.quoteRef.snapshotChanges().pipe(
      map(c => {
        const val = c.payload.val();
        if (val) {
          return ({
            id: c.payload.key,
            name: val.name,
            quote: val.quote,
            at: val.at
          });
        } else {
          return {};
        }
      })
    );
    return this.quote$;
  }


  createQuote(quote: Quote): void {
    console.log("creating " + JSON.stringify(quote));
    this.quotesRef = this.db.list('/quotes');
    this.quotesRef.push(quote)
      .then(ref => console.log(`${ref.key} successfuly created ` + JSON.stringify(quote)))
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
        console.log(`${quoteId} successfully removed!`);
      })
      .catch(error => this.handleError(error));
  }

  deleteAll() {
    this.quotesRef.remove();
  }

  // Default error handling for all actions
  private handleError(error) {
    console.log("ERROR: " + error);
  }
}
