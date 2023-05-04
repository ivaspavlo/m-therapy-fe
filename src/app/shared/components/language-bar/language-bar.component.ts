import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';


@Component({
  selector: 'app-language-bar',
  templateUrl: './language-bar.component.html',
  styleUrls: ['./language-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageBarComponent implements OnInit {

  @Input() items: string[];
  @Input() current: string;

  @Output() languageChange: EventEmitter<string> = new EventEmitter();

  public current$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public listItems$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public isOpened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private componentDestroyed$: Subject<void> = new Subject();

  constructor() { }

  ngOnInit(): void {
    this.setValues(this.current || this.items[0] || '');
  }

  public onMenuClick(): void {
    this.isOpened$.next(!this.isOpened$.value);
  }

  public onItemClick(event: MouseEvent, item: string): void {
    event.preventDefault();
    event.stopPropagation();
    this.isOpened$.next(false);
    this.setValues(item);
    this.languageChange.emit(item);
  }

  private setValues(item: string): void {
    this.current$.next(item);
    this.listItems$.next(this.items.filter(i => i !== item));
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }

}
