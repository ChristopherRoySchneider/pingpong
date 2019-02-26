import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { MatchsComponent } from './matchs/matchs.component';

import { NewmatchComponent } from './newmatch/newmatch.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MatchByIdComponent } from './match-by-id/match-by-id.component';
import { EditMatchComponent } from './edit-match/edit-match.component';
import { SharedModule } from './shared/shared.module';
import { ChatModule } from './chat/chat.module';

@NgModule({
  declarations: [
    AppComponent,

    MatchsComponent,

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
    SharedModule,
    ChatModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
