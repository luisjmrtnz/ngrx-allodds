import { 
  Component, 
  OnInit, 
  Input, 
  Output, 
  EventEmitter,
  ElementRef,
  ViewChild,
  Renderer
} from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Category } from '../../models';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  @Input() loading: boolean;
  @Input() showList: boolean;
  @Output() checked = new EventEmitter<Category>();
  @Output() clear = new EventEmitter<any>();
  @ViewChild('termInput') termElement: ElementRef;
  term = new FormControl();
  filterCategories: Category[];
  _categories: Category[];

  @Input('categories') 
  set categories(value: Category[]) {
    this._categories = value;
    this.initFilter();
  }

  get categories() {
    return this._categories;
  }

  constructor(private renderer: Renderer) { }

  ngOnInit() {
    this.term.valueChanges
      .debounceTime(200)
      .distinctUntilChanged()
      .subscribe(term => this.onSearch(term));
  }

  initFilter() {
    this.filterCategories = this.categories;
  }

  show() {
    this.showList = !this.showList;
  }

  getButtonText() {
    return (this.loading) ? 'Loading Categories...': 'Select a Category';
  }

  onKeyUp($event) {
    if($event.keyCode === 27){
      this.showList = false;
    }
  }

  onSearch(query: string) {
    this.initFilter();

    if(!query || query.trim() === '') {
          return;
    }

    this.filterCategories = this.filterCategories.filter((cat: Category) => {
        if(cat.category_name.toLowerCase().indexOf(query.toLowerCase()) > -1) {
            return true;
        }
        return false;
      });
  }

  onChecked(category: Category) {
    this.checked.emit(category);
    this.renderer.invokeElementMethod(this.termElement.nativeElement, 'focus');
  }

  get selected() {
    return this.categories.filter(cat => cat.selected === true);
  }

  onClear($event){ 
    $event.stopPropagation();
    this.clear.emit(null) 
  }

}
