
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';


export interface ILanguageBarItem {
  name: string;
  id: string;
  icon?: string;
}

@Component({
  selector: 'app-language-bar',
  templateUrl: './language-bar.component.html',
  styleUrls: ['./language-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageBarComponent implements OnInit {
  
  @Input() items: ILanguageBarItem[];
  @Input() current: ILanguageBarItem;
  @Output() languageChange: EventEmitter<string> = new EventEmitter();
  
  public current$: BehaviorSubject<ILanguageBarItem> = new BehaviorSubject(null);
  public listItems$: BehaviorSubject<ILanguageBarItem[]> = new BehaviorSubject(null);
  public isOpened$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public checkId = 'lang-bar-item';
  
  private componentDestroyed$: Subject<void> = new Subject();

  constructor() { }

  ngOnInit(): void {
    this.setValues(this.current || this.items[0] || null);
  }
  
  public onMenuClick(): void {
    this.isOpened$.next(!this.isOpened$.value);
  }
  
  public onItemClick(event: MouseEvent, item: ILanguageBarItem): void {
    event.preventDefault();
    event.stopPropagation();
    this.isOpened$.next(false);
    this.setValues(item);
    this.languageChange.emit(item.id);
  }
  
  private setValues(item: ILanguageBarItem): void {
    this.current$.next(item);
    this.listItems$.next(this.items.filter(i => i.id !== item.id));
  }
  
  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }

}
