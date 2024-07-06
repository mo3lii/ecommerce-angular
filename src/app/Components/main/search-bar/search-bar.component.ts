import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent implements OnInit {
  @Input() callBack!: (searchWord: string) => void;
  ngOnInit(): void {
    if (this.searchWord != '') {
      this.triggerCallBack();
    }
  }
  searchWord: string = '';
  triggerCallBack() {
    this.callBack(this.searchWord);
  }
}
