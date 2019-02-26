
import { GameComponent } from './game/game.component';
import { TermsComponent } from './terms/terms.component';
import { RulesComponent } from './rules/rules.component';
import { MatchByIdComponent } from './match-by-id/match-by-id.component';
import { MatchesComponent } from './matches/matches.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewmatchComponent } from './newmatch/newmatch.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditMatchComponent } from './edit-match/edit-match.component';
const routes: Routes = [
  { path: 'game', component: GameComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'rules', component: RulesComponent },
  { path: 'home',component: MatchesComponent },
  { path: 'new',component: NewmatchComponent },
  // use a colon and parameter name to include a parameter in the url
  { path: 'edit/:id', component: EditMatchComponent },
  { path: 'view/:id', component: MatchByIdComponent },
  // redirect to /alpha if there is nothing in the url
  { path: '', pathMatch: 'full', redirectTo:"/home" },
  // the ** will catch anything that did not match any of the above routes
  { path: '**', component: PageNotFoundComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }