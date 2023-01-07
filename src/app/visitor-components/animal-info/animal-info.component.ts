import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Animal } from '../models/animal.model';
import { Comment } from '../models/comment.model';
import { VisitorService } from '../visitor.service';

@Component({
  selector: 'app-animal-info',
  templateUrl: './animal-info.component.html',
  styleUrls: ['./animal-info.component.css']
})
export class AnimalInfoComponent implements OnInit, OnDestroy {
  animal!: Animal;
  comments: Comment[] = [];
  id: number = -1;
  private animalSub!: Subscription;
  private commentsSub!: Subscription;
  form!: FormGroup;
  error_msg: string = '';
  displayedColumns: string[] = ['name', 'comment'];
  totalComments: number = 0;
  commentsPerPage: number = 4;
  currentPage: number = 0;
  pageSizeOptions: number[] = [4];


  constructor(
    private route: ActivatedRoute,
    private visitorService: VisitorService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      comment: new FormControl(null, [Validators.required])
    });
    this.commentsSub = this.visitorService.getCommentsUpdatedListener().subscribe(
      (commentData: {comments: Comment[], totalComments: number}) => {
        this.comments = commentData.comments;
        this.totalComments = commentData.totalComments;
      }
    );
    this.animalSub = this.visitorService.getAnimalUpdatedListener().subscribe(
      (animalData: {animal: Animal}) => {
        this.animal = animalData.animal;
        this.visitorService.getCommentsForAnimal(this.animal, this.commentsPerPage, this.currentPage);
      }
    );
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = Number(paramMap.get('id'));
      this.visitorService.getAnimal(this.id);
    });
  }

  ngOnDestroy() {
    this.animalSub.unsubscribe();
    this.commentsSub.unsubscribe();
  }

  onCommentAdd() {
    this.error_msg = '';
    if (this.form.get('name')?.errors?.['required']) {
      this.error_msg = 'Morate uneti ime!';
      return;
    } else if (this.form.get('comment')?.errors?.['required']) {
      this.error_msg = 'Morate uneti komentar!';
      return;
    } else {
      this.visitorService.addComment(this.id, this.form.get('name')?.value, this.form.get('comment')?.value);
      this.form.reset();
    }
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex;
    this.commentsPerPage = pageData.pageSize;
    this.visitorService.getCommentsForAnimal(this.animal, this.commentsPerPage, this.currentPage);
  }
}
