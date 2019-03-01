import { TermsComponent } from './terms/terms.component';
import { RulesComponent } from './rules/rules.component';
import { MatchByIdComponent } from './match-by-id/match-by-id.component';
import { MatchesComponent } from './matches/matches.component';
import { WatchComponent } from './watch/watch.component';
import { GamecasterComponent } from './gamecaster/gamecaster.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewmatchComponent } from './newmatch/newmatch.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditMatchComponent } from './edit-match/edit-match.component';
import { GameByIdComponent } from './game-by-id/game-by-id.component';
import { CastComponent } from './cast/cast.component';

const routes: Routes = [
  { path: 'gamecast/:matchid', component: GamecasterComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'rules', component: RulesComponent },
  { path: 'home',component: MatchesComponent },
  { path: 'new',component: NewmatchComponent },
  { path: 'cast',component: CastComponent },
  // use a colon and parameter name to include a parameter in the url
  { path: 'edit/:matchid', component: EditMatchComponent },
  { path: 'read/:matchid', component: MatchByIdComponent },
  { path: 'read/:matchid/games/:gameid', component: GameByIdComponent },
  { path: 'view/:matchid', component: WatchComponent },

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
