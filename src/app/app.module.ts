import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import * as components from './components';

/* Reducers */
import * as reducers from './reducers';
import { CategoryEffects } from './effects';

/* Services */
import { OddService } from './providers';
import * as actions from './actions';

@NgModule({
  declarations: [
    AppComponent,
    components.CategoriesComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    EffectsModule.runAfterBootstrap(CategoryEffects),
    StoreModule.provideStore({
      categories: reducers.categoryReducer
    })
  ],
  providers: [
    OddService,
    actions.CategoriesActions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
