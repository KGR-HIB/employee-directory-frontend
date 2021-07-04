import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { Pagination } from '../../models/pagination.model';

/**
 * Paginator
 *
 * @author bcueva
 * @version 1.0
 */
@Component({
  selector: "app-paginator",
  templateUrl: "./paginator.component.html",
  styleUrls: ["./paginator.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class PaginatorComponent {
  @Input() pagination!: Pagination;
  @Output() pageChanged: EventEmitter<any> = new EventEmitter();
  currentPage: number = 1;
  numPages: number = 1;

  constructor() {}

  onPageChange(event: any) {
    this.pagination.currentPage = event.page;
    this.pageChanged.emit(event);
  }
}
