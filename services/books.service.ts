import { Injectable } from '@angular/core';
import { Book } from '../models/Book.model';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';

@Injectable()
export class BooksService {
  books: Book[] = [];
  bookSubject = new Subject<Book[]>();

  constructor() { }

  emitSubject() {
    this.bookSubject.next(this.books);
  }

  saveBooks() {
    firebase.database().ref('/books').set(this.books);
  }

  getBooks() {
    firebase.database().ref('/books')
    .on('value', (data) => {
      this.books = data.val() ? data.val() : [];
      this.emitSubject();
    });
  }

  getSingleBook(id: number) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('/books/' + id).once('value').then(
        (data) => {
          resolve(data.val());
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  creatNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitSubject();
  }

  removeBook(book: Book) {
    if (book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => {
          console.log('photo supprimée !');
        }
      ).catch(
        (error) => {
          console.log(error);
        }
      );
    }
    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        if (bookEl === book) {
        return true;
        }
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitSubject();
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        console.log(file);
        const upload = firebase.storage().ref()
        .child('images/' + almostUniqueFileName + file.name)
        .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED, () => {
          console.log('Chargement...');
        },
        (error) => {
          console.log('Erreur de chargement:' + error);
          reject();
        },
        () => {
          console.log(upload);
          upload.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
            resolve(downloadURL);
          });
        });
      }
    );
  }
}
