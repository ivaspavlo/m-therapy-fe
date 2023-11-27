import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUpdate } from '../../interfaces';
import { PasswordValidators, UPDATE_TOKEN } from '../../constants';
import { INPUT_TYPES } from '@app/core/constants';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss', '../../auth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateComponent {

  @Output() login: EventEmitter<IUpdate> = new EventEmitter();

  public updateToken: string = '';
  public updateForm!: FormGroup;
  public INPUT_TYPES = INPUT_TYPES;

  constructor(
    private route : ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.updateToken = this.route.snapshot.params[UPDATE_TOKEN];
  
    this.updateForm = this.fb.group({
      password: ['',  [Validators.required, PasswordValidators.default]],
      confirmPassword: ['', [Validators.required, PasswordValidators.default, PasswordValidators.passwordsEqual()]]
    });
  }

}
