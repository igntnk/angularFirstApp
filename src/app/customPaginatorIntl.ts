import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomPaginatorIntl extends MatPaginatorIntl {

  override itemsPerPageLabel = 'Items per page:';
  override nextPageLabel = 'Next page';
  override previousPageLabel = 'Previous page';
  override firstPageLabel = 'First page';
  override lastPageLabel = 'Last page';

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    const from = page * pageSize + 1;
    const to = (page + 1) * pageSize;
    return `${from} - ${to} of ${length}`;
  }
}
