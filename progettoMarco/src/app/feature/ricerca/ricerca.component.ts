import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchService } from '../../core/service/search.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.scss'],
})
export class RicercaComponent implements OnInit {
  sub: Subscription;
  objectList: any[];
  formGroup: FormGroup;
  hide = false;
  displayedColumns = ['postId', 'id', 'name', 'email'];
  dataSource: any[];
  page = 1;
  pageSize = 10;
  bbo: boolean;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.email]),
      name: new FormControl(''),
      postId: new FormControl(''),
      id: new FormControl(''),
    });
  }

  clean() {
    this.formGroup.reset();
    this.hide = false;
  }

  submit() {
    this.hide = true;
    this.searchService
      .getFiltered(this.formGroup.value, this.page, this.pageSize)
      .subscribe((res) => {
        this.dataSource = res;
      });
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.submit();
  }
}
