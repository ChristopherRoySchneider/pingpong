import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedModule } from './shared/shared.module';
import { ChatModule } from './chat/chat.module';
import { GameComponent } from './game/game.component';
import { GlanceComponent } from './glance/glance.component';
import { TableComponent } from './table/table.component';
import { TermsComponent } from './terms/terms.component';
import { RulesComponent } from './rules/rules.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    TableComponent,
    GlanceComponent,
    TermsComponent,
    RulesComponent,
    GameComponent
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