import { Student } from "../modules/students";

export class PageResponse{
  content: Array<Student>;
  numberOfElements: number;
  totalElements: number;

  totalPages: number;
  size: number; //pageSize
  number: number; //pageIndex
}
