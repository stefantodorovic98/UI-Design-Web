import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Animal } from '../models/animal.model';
import { VisitorService } from '../visitor.service';

@Component({
  selector: 'app-animals-list',
  templateUrl: './animals-list.component.html',
  styleUrls: ['./animals-list.component.css']
})
export class AnimalsListComponent implements OnInit, OnDestroy {
  animals: Animal[] = [];
  displayedColumns: string[] = ['image', 'name'];
  private animalsSub!: Subscription;
  totalAnimals: number = 0;
  animalsPerPage: number = 5;
  currentPage: number = 0;
  pageSizeOptions: number[] = [5];

  constructor(
    private visitorService: VisitorService
  ) {}

  ngOnInit() {
    this.animalsSub = this.visitorService.getAnimalsUpdatedListener().subscribe(
      (animalsData: {animals: Animal[], totalAnimals: number}) => {
        this.animals = animalsData.animals;
        this.totalAnimals = animalsData.totalAnimals;
      }
    );
    this.visitorService.getAnimals(this.animalsPerPage, this.currentPage);
  }

  ngOnDestroy() {
    this.animalsSub.unsubscribe();
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex;
    this.animalsPerPage = pageData.pageSize;
    this.visitorService.getAnimals(this.animalsPerPage, this.currentPage);
  }
}
