export class Page<T> {
  data: T[] = [];
  total: number = 0;
  currentPage: number = 0;
  totalPages: number = 0;
}
