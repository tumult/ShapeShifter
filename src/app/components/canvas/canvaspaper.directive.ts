import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { ActionSource } from 'app/model/actionmode';
import { DestroyableMixin } from 'app/scripts/mixins';
import { PaperProject } from 'app/scripts/paper';
import { PaperService } from 'app/services';
import { State, Store } from 'app/store';
import * as $ from 'jquery';

import { CanvasLayoutMixin } from './CanvasLayoutMixin';

@Directive({ selector: '[appCanvasPaper]' })
export class CanvasPaperDirective extends CanvasLayoutMixin(DestroyableMixin())
  implements AfterViewInit, OnDestroy {
  @Input() actionSource: ActionSource;
  private readonly $canvas: JQuery<HTMLCanvasElement>;
  private paperProject: PaperProject;

  constructor(
    elementRef: ElementRef,
    private readonly ps: PaperService,
    private readonly store: Store<State>,
  ) {
    super();
    this.$canvas = $(elementRef.nativeElement) as JQuery<HTMLCanvasElement>;
  }

  ngAfterViewInit() {
    this.paperProject = new PaperProject(this.$canvas.get(0), this.ps, this.store);
  }

  ngOnDestroy() {
    this.paperProject.remove();
  }

  // @Override
  protected onDimensionsChanged() {
    const { w, h } = this.getViewport();
    const scale = this.cssScale;
    this.$canvas.css({ width: w * scale, height: h * scale });
    this.paperProject.setDimensions(w, h, w * scale, h * scale);
  }
}
