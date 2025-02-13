import { Component, OnInit } from '@angular/core';
import { DialogConfig, DialogRef } from '@app/modules/ui';


@Component({
  selector: 'app-test-modal',
  templateUrl: './test-modal.component.html',
  styleUrls: ['./test-modal.component.scss']
})
export class TestModalComponent implements OnInit {

  constructor(
    private config: DialogConfig<unknown>,
    private dialog: DialogRef
  ) { }

  ngOnInit(): void { }

}
