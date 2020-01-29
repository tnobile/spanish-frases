import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { QuoteService } from "../quote.service";
import { Quote } from "../quote.model"
import { Location } from '@angular/common';


@Component({
  selector: 'app-quote-create',
  templateUrl: './quote-create.component.html',
  styleUrls: ['./quote-create.component.css']
})
export class QuoteCreateComponent implements OnInit {

  constructor(private fromBuilder: FormBuilder, private quoteService: QuoteService, private location: Location) { }

  model: Quote;

  ngOnInit() {
    this.model = new Quote("bitch", "a quien madruga Dios le ayuda");
  }

  onSubmit() {
    const q = new Quote(this.model.name, this.model.quote);
    this.quoteService.createQuote(q);
    this.location.back();
  }
}
