import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ILanguage } from '@app/interfaces';
import { BehaviorSubject, Subject } from 'rxjs';


@Component({
  selector: 'app-language-bar',
  templateUrl: './language-bar.component.html',
  styleUrls: ['./language-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageBarComponent implements OnInit {

  @Input() items: ILanguage[];
  @Input() current: ILanguage;

  @Output() languageChange: EventEmitter<ILanguage> = new EventEmitter();

  @ViewChild('activateButton') activateButton: ElementRef;

  public current$: BehaviorSubject<ILanguage | null> = new BehaviorSubject<ILanguage | null>(null);
  public listItems$: BehaviorSubject<ILanguage[]> = new BehaviorSubject<ILanguage[]>([]);
  public isOpened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private componentDestroyed$: Subject<void> = new Subject();

  constructor() { }

  ngOnInit(): void {
    this.setValues(this.current || this.items[0] || null);
  }

  public onToggleMenu(): void {
    this.isOpened$.value
      ? this.onCloseMenu()
      : this.onOpenMenu();
  }

  public onOpenMenu(): void {
    this.isOpened$.next(true);
  }

  public onCloseMenu(): void {
    this.isOpened$.next(false);
  }

  public onItemClick(event: Event, item: ILanguage): void {
    event.preventDefault();
    event.stopPropagation();
    this.isOpened$.next(false);
    this.setValues(item);
    this.languageChange.emit(item);
    this.activateButton.nativeElement.blur();
  }

  private setValues(item: ILanguage | null): void {
    this.current$.next(item);
    const listItems = item ? this.items.filter(i => i.title !== item.title) : this.items;
    this.listItems$.next(listItems);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }
}
