import { Component, inject, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { DataFacadeService } from '../../shared/services/data-facade.service';
import { Author, AuthorSortType } from '../../core/models/author.model';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogModule,
    TableModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    AvatarModule,
    FormsModule,
    AsyncPipe,
  ],
})
export class AuthorListComponent implements OnInit {
  private authorFacade = inject(DataFacadeService);
  private fb = inject(FormBuilder);

  authors$ = this.authorFacade.authors$;
  totalAuthors$ = this.authorFacade.totalAuthors$;
  searchText = signal('');
  searchTextChanged = new Subject<string>();
  selectedSortType = signal(AuthorSortType.Name);
  sortOptions = signal([
    { label: 'Name', value: AuthorSortType.Name },
    { label: 'Total Posts', value: AuthorSortType.totalPosts },
    { label: 'Total Comments', value: AuthorSortType.totalComments },
  ]);
  displayModal = signal(false);
  authorForm: FormGroup;

  constructor() {
    this.authorForm = this.fb.group({
      name: ['', Validators.required],
      imageUrl: [''],
      totalPosts: [null, Validators.required],
      totalComments: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadAuthors({ first: 0, rows: 10 });

    this.searchTextChanged.pipe(debounceTime(300)).subscribe(() => {
      this.loadAuthors({ first: 0, rows: 10 });
    });
  }

  addNewAuthor() {
    this.displayModal.set(true);
  }

  onSearch() {
    this.searchTextChanged.next(this.searchText());
  }

  onSortChange() {
    this.loadAuthors({ first: 0, rows: 10 });
  }

  loadAuthors(event: { rows: number; first?: number }) {
    console.info(event);
    this.authorFacade.loadAuthors(this.searchText(), this.selectedSortType());
  }

  saveAuthor() {
    if (this.authorForm.valid) {
      const newAuthor = new Author(this.authorForm.value);
      alert(JSON.stringify(newAuthor));
      this.authorForm.reset();
      this.authorFacade.loadAuthors();
      this.displayModal.set(false);
    }
  }
}
