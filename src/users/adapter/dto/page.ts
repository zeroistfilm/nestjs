export class Page<T> {
  pageSize: number;
  totalCount: number;
  totalPage: number;
  currentPage: number;
  items: T[];
  constructor(totalCount: number, currentPage: number, pageSize: number, items: T[]) {
    this.totalCount = totalCount;
    this.totalPage = Math.ceil(totalCount / pageSize);
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.items = items;
  }
}
