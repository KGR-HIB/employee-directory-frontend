export class Pagination {
  totalItems: number = 0;
  itemsPerPage: number;
  private _maxPages: number;
  private _currentPage: number = 0;

  constructor(itemsPerPage: number, maxPages: number) {
    this.itemsPerPage = itemsPerPage;
    this._maxPages = maxPages;
  }

  set currentPage(page: number) {
    this._currentPage = page - 1;
  }

  get currentPage(): number {
    return this._currentPage;
  }

  get maxPages(): number {
    return this._maxPages;
  }
}
