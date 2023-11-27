import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INPUT_TYPES } from '@app/core/constants';
import { IRemind } from '../../interfaces';


@Component({
  selector: 'app-remind',
  templateUrl: './remind.component.html',
  styleUrls: ['./remind.component.scss', '../../auth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemindComponent {

  @Output() login: EventEmitter<IRemind> = new EventEmitter();

  public remindForm!: FormGroup;
  public INPUT_TYPES = INPUT_TYPES;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.remindForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

}
