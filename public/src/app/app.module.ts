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



import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:1337', options: {} };

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

    SocketIoModule.forRoot(config),
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
