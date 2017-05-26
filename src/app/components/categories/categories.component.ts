import { 
  Component, 
  OnInit, 
  Input, 
  Output, 
  EventEmitter,
  ElementRef,
  ViewChild,
  Renderer,
  ChangeDetectionStrategy
} from '@angular/core';

import { Category } from '../../models';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent implements OnInit {
  @Input() loading: boolean;
  @Input() showList: boolean;
  @Input() categories: Category[];
  @Output() checked = new EventEmitter<Category>();
  @Output() clear = new EventEmitter<any>();
  @Output() toggle = new EventEmitter<boolean>();
  @ViewChild('search') search: ElementRef;

  constructor(private renderer: Renderer) { }

  ngOnInit() {
  }

  show() {
    this.toggle.emit(null);
  }

  onKeyUp($event) {
    if($event.keyCode === 27){
      this.toggle.emit(false);
    }
  }

  onChecked(category: Category) {
    this.checked.emit(category);
    this.renderer.invokeElementMethod(this.search.nativeElement, 'focus');
  }
  
  onClear($event){ 
    $event.stopPropagation();
    this.clear.emit(null);
    this.renderer.setElementProperty(this.search.nativeElement, 'value', '');
    this.renderer.invokeElementMethod(this.search.nativeElement, 'focus');
  }

}
