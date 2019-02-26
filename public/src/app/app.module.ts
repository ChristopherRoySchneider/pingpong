import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { MatchesComponent } from './matches/matches.component';

import { NewmatchComponent } from './newmatch/newmatch.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { MatchByIdComponent } from './match-by-id/match-by-id.component';
import { EditMatchComponent } from './edit-match/edit-match.component';



import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:1337', options: {} };


@NgModule({
  declarations: [
    AppComponent,

    MatchesComponent,

    NewmatchComponent,
    PageNotFoundComponent,
    MatchByIdComponent,
    EditMatchComponent
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
