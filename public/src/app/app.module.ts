import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { PetsComponent } from './pets/pets.component';

import { NewpetComponent } from './newpet/newpet.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PetByIdComponent } from './pet-by-id/pet-by-id.component';
import { EditPetComponent } from './edit-pet/edit-pet.component';
import { SharedModule } from './shared/shared.module';
import { ChatModule } from './chat/chat.module';

@NgModule({
  declarations: [
    AppComponent,

    PetsComponent,

    NewpetComponent,
    PageNotFoundComponent,
    PetByIdComponent,
    EditPetComponent
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
