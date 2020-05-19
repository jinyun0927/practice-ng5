import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from '../models/Book.model';
import { BooksService } from '../services/books.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {

  books: Book[];
  bookSubscription: Subscription;

  constructor(private booksService: BooksService,
              private router: Router) { }

  ngOnInit() {
    this.bookSubscription = this.booksService.bookSubject.subscribe(
      (book: Book[]) => {
        this.books = book;
      }
    );
    this.booksService.getBooks();
    this.booksService.emitSubject();
  }

  onDeleteBook(book: Book) {
    this.booksService.removeBook(book);
  }

  onNewBook() {
    this.router.navigate(['/books', 'new']);
  }

  onViewBook(index: number) {
    this.router.navigate(['/books', 'view', index]);
  }

  ngOnDestroy() {
    this.bookSubscription.unsubscribe();

  }

}
