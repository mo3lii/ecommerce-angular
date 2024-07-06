import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagginator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagginator.component.html',
  styleUrl: './pagginator.component.css',
})
export class PagginatorComponent {
  @Input() getDataPage!: (pageNum: number) => void;
  @Input() currentPageNum: number = 1;
  @Input() totalPages: number = 1;
  pagesList: number[] = [];
  decreasePageNum() {
    this.changePage(this.currentPageNum - 1);
  }
  increasePageNum() {
    this.changePage(this.currentPageNum + 1);
  }
  isPrevDisabled() {
    return this.currentPageNum == 1;
  }
  isNextDisabled() {
    return this.currentPageNum == this.totalPages;
  }
  changePage(pageNum: number) {
    if (this.currentPageNum > this.totalPages)
      this.currentPageNum = this.totalPages;
    this.currentPageNum = pageNum;
    this.getDataPage(this.currentPageNum);
  }

  updatePagesList() {
    this.pagesList = [];
    if (this.totalPages >= 3) {
      if (this.currentPageNum == 1) {
        this.pagesList = [1, 2, 3];
      } else if (this.currentPageNum == this.totalPages) {
        this.pagesList = [
          this.totalPages - 2,
          this.totalPages - 1,
          this.totalPages,
        ];
      } else {
        this.pagesList = [
          this.currentPageNum - 1,
          this.currentPageNum,
          this.currentPageNum + 1,
        ];
      }
    } else {
      for (let i = 1; i <= this.totalPages; i++) {
        this.pagesList.push(i);
      }
    }
  }
}
