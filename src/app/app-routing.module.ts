import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuoteListComponent } from './quote-list/quote-list.component';
import { QuoteCreateComponent } from './quote-create/quote-create.component';
import { QuoteDetailComponent } from './quote-detail/quote-detail.component';


const routes: Routes = [
  { path: 'quotes', component: QuoteListComponent },
  { path: 'create', component: QuoteCreateComponent },
  { path: 'detail/:id', component: QuoteDetailComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
