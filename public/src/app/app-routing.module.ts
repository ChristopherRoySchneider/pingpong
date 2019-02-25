import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GameComponent } from './game/game.component';
import { TermsComponent } from './terms/terms.component';
import { RulesComponent } from './rules/rules.component';

const routes: Routes = [
  { path: '', component: GameComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'rules', component: RulesComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }