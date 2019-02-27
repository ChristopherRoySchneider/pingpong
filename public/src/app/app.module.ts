import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { GameComponent } from './game/game.component';
import { GlanceComponent } from './glance/glance.component';
import { TableComponent } from './table/table.component';
import { TermsComponent } from './terms/terms.component';
import { RulesComponent } from './rules/rules.component';
import { BoxScoreComponent } from './box-score/box-score.component';
import { SummaryComponent } from './summary/summary.component';

import { MatchesComponent } from './matches/matches.component';

import { NewmatchComponent } from './newmatch/newmatch.component';


import { MatchByIdComponent } from './match-by-id/match-by-id.component';
import { EditMatchComponent } from './edit-match/edit-match.component';



import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { GameByIdComponent } from './game-by-id/game-by-id.component';

const config: SocketIoConfig = { url: 'http://localhost:1337', options: {} };


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    TableComponent,
    GlanceComponent,
    TermsComponent,
    RulesComponent,
    GameComponent,
    BoxScoreComponent,
    SummaryComponent,

    MatchesComponent,

    NewmatchComponent,
    PageNotFoundComponent,
    MatchByIdComponent,
    EditMatchComponent,
    GameByIdComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,

    SocketIoModule.forRoot(config),
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})

export class AppModule { }