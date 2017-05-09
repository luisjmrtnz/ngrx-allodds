import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MyDatePickerModule } from 'mydatepicker';
import { AppComponent } from './app.component';
import * as components from './components';

/* Reducers */
import * as reducers from './reducers';
import * as effects from './effects';

/* Services */
import { OddService } from './providers';
import * as actions from './actions';

/* Pipes */
import * as pipes from './pipes';

@NgModule({
  declarations: [
    AppComponent,
    components.CategoriesComponent,
    components.DropdownButtonComponent,
    components.MatchButtonComponent,
    components.MatchTableComponent,
    pipes.SearchFilterPipe,
    pipes.CategorySelectedPipe,
    pipes.ShortTextPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore({ 
      categories: reducers.categoryReducer, 
      matches: reducers.matchesReducer 
    }),
    EffectsModule.runAfterBootstrap(effects.CategoryEffects),
    EffectsModule.runAfterBootstrap(effects.MatchEffects),
    MyDatePickerModule
  ],
  providers: [
    OddService,
    actions.CategoriesActions,
    actions.MatchesActions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
