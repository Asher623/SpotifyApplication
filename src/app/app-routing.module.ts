import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AlbumComponent } from './album/album.component';
import { ArtistDiscographyComponent } from './artist-discography/artist-discography.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { LoginComponent } from './login/login.component';
import { NewReleasesComponent } from './new-releases/new-releases.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { GuardAuthService } from './guard-auth.service';

//ID: 314892b3ecc94858a86a8c3676ced923
//Secret: 6df04dacd59e4e55b2b372c03cefe050
const routes: Routes = [
  {path: "about", component: AboutComponent, canActivate: [GuardAuthService]},
  {path: "newReleases", component: NewReleasesComponent, canActivate: [GuardAuthService]},
  {path: "", redirectTo: "/login", pathMatch: "full"},
  {path: "album/:id", component: AlbumComponent, canActivate: [GuardAuthService]},
  {path: "artist/:id", component: ArtistDiscographyComponent, canActivate: [GuardAuthService]},
  {path: "search", component: SearchResultComponent, canActivate: [GuardAuthService]},
  {path: "favourites", component: FavouritesComponent, canActivate: [GuardAuthService]},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "**", component: NotFoundComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
