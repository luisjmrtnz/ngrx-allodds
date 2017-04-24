import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { Category } from '../../models';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  @Input() categories: Category[];
  @Input() category: Category;
  @Input() showList: boolean;
  @Output() show = new EventEmitter<boolean>();
  @Output() selected = new EventEmitter<Category>();

  constructor() { }

  ngOnInit() {
  }

  getCategory() {
    return (this.category) ? this.category.category_name : 'Select Category..';
  }

}
