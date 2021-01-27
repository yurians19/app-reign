import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { ArticleService } from "../../services/article.service";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  constructor(public articleService: ArticleService) { }

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles() {
    this.articleService.getArticles().subscribe((res) => {
      this.articleService.Articles = this.formatHour(res);
    },error=>console.log(error)
    );
  }

  deleteArticle(_id: string) {
    if (confirm("Are you sure you want to delete it?")) {
      this.articleService.deleteArticle(_id).subscribe((res) => {
        this.getArticles();
      });
    }
  }

  formatHour(arr) {
    return arr.map(elem =>{
      if (moment(elem.created_at).isSame(moment(), 'day')) {
        return {...elem, created_at: moment.parseZone(elem.created_at).format('hh:mm A')}
      }
      if (moment(elem.created_at).isSame(moment().subtract(1, 'days'), 'day')) {
        return {...elem, created_at: 'Yesterday'}
      }
      if (moment(elem.created_at).isBefore(moment().subtract(1, 'days'), 'day')) {
        return {...elem, created_at: moment.parseZone(elem.created_at).format('MMM DD')}
      }
    })
  }

  openUrl({story_url, url}) {
    if (story_url) {
      window.open(story_url);
    } else{
      window.open(url);
    }
  }

}
