import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WorkerService } from '../worker.service';

@Component({
  selector: 'app-animal-adding',
  templateUrl: './animal-adding.component.html',
  styleUrls: ['./animal-adding.component.css']
})
export class AnimalAddingComponent implements OnInit {
  form!: FormGroup;
  imagePreview!: string;
  error_msg: string = '';

  constructor(
    private workerService: WorkerService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      image: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required])
    });
  }

  onImagePicked(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files !== null) {
      const file = files[0];
      this.form.patchValue({ 'image': file });
      this.form.get('image')?.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onAdd() {
    this.error_msg = '';
    if (this.form.get('image')?.errors?.['required']) {
      this.error_msg = 'Morate uneti sliku!';
      return;
    } else if (this.form.get('name')?.errors?.['required']) {
      this.error_msg = 'Morate uneti ime!';
      return;
    } else if (this.form.get('description')?.errors?.['required']) {
      this.error_msg = 'Morate uneti opis!';
      return;
    } else {
      let imagePath: string = 'assets/animals/' + this.form.get('image')!.value.name;
      this.workerService.addAnimal(
        imagePath,
        this.form.get('name')!.value,
        this.form.get('description')!.value,
      );
      this.form.reset();
    }
  }

}
