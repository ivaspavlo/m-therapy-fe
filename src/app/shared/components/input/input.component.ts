import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';


export type InputTypes = 'text' | 'number' | 'textarea' | 'password';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnInit {

  @Input() control: FormControl;
  @Input() errorsMap: { [key:string]: string; };
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: InputTypes = 'text';

  public get isText() { return this.type === 'text'; }
  public get isTextArea() { return this.type === 'textarea'; }
  public hasFocus = false;
  public id: string = '';

  private componentDestroyed$: Subject<void> = new Subject();

  constructor() { }

  ngOnInit(): void {
    this.id = `${this.label}_${Math.random()}`;
  }
  
  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }

}
