import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { QuoteService } from "../quote.service";
import { Quote } from "../quote.model"


@Component({
  selector: 'app-quote-create',
  templateUrl: './quote-create.component.html',
  styleUrls: ['./quote-create.component.css']
})
export class QuoteCreateComponent implements OnInit {

  constructor(private fromBuilder: FormBuilder, private quoteService: QuoteService) { }

  model: Quote;

  ngOnInit() {
    this.model = { id: "x", name: "bitch", quote: "a quien madruga Dios le ayuda" };
  }

  onSubmit() {
    this.quoteService.createQuote({ id: "id", name: this.model.name, quote: this.model.quote });
    console.log("submitted");
  }
}