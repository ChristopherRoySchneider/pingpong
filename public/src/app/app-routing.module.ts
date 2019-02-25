import { PetByIdComponent } from './pet-by-id/pet-by-id.component';
import { PetsComponent } from './pets/pets.component';
// import { AlphaComponent } from './alpha/alpha.component';
// import { BetaComponent } from './beta/beta.component';
// import { GammaComponent } from './gamma/gamma.component';
// import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewpetComponent } from './newpet/newpet.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditPetComponent } from './edit-pet/edit-pet.component';
const routes: Routes = [
  { path: 'home',component: PetsComponent },
  { path: 'new',component: NewpetComponent },
  // use a colon and parameter name to include a parameter in the url
  { path: 'edit/:id', component: EditPetComponent },
  { path: 'view/:id', component: PetByIdComponent },
  // redirect to /alpha if there is nothing in the url
  { path: '', pathMatch: 'full', redirectTo:"/home" },
  // the ** will catch anything that did not match any of the above routes
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
