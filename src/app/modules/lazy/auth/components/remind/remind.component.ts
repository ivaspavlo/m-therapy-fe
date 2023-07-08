import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRemind } from '../../interfaces';


@Component({
  selector: 'app-remind',
  templateUrl: './remind.component.html',
  styleUrls: ['./remind.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemindComponent {

  @Output() login: EventEmitter<IRemind> = new EventEmitter();

  public remindForm!: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.remindForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

}
