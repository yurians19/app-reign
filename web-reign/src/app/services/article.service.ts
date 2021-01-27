import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Article } from "../models/article";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  readonly URL_API = "http://localhost:3000/api/article";
  Articles: Article[];

  constructor(private http: HttpClient) { }

  getArticles() {
    return this.http.get<Article[]>(this.URL_API);
  }

  deleteArticle(_id: string) {
    return this.http.delete(`${this.URL_API}/${_id}`);
  }
}
