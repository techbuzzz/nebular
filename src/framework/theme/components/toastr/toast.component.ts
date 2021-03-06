/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

import { NbToast } from './model';
import { NbIconConfig } from '../icon/icon.component';

/**
 * The `NbToastComponent` is responsible for rendering each toast with appropriate styles.
 *
 * @styles
 *
 * toastr-background-color:
 * toastr-border-color:
 * toastr-border-style:
 * toastr-border-width:
 * toastr-border-radius:
 * toastr-padding:
 * toastr-shadow:
 * toastr-text-color:
 * toastr-text-font-family:
 * toastr-text-font-size:
 * toastr-text-font-weight:
 * toastr-text-line-height:
 * toastr-title-text-font-family:
 * toastr-title-text-font-size:
 * toastr-title-text-font-weight:
 * toastr-title-text-line-height:
 * toastr-destroyable-hover-background-color:
 * toastr-destroyable-hover-border-color:
 * toastr-primary-background-color:
 * toastr-primary-border-color:
 * toastr-primary-text-color:
 * toastr-icon-primary-background-color:
 * toastr-icon-primary-color:
 * toastr-destroyable-hover-primary-background-color:
 * toastr-destroyable-hover-primary-border-color:
 * toastr-success-background-color:
 * toastr-success-border-color:
 * toastr-success-text-color:
 * toastr-icon-success-background-color:
 * toastr-icon-success-color:
 * toastr-destroyable-hover-success-background-color:
 * toastr-destroyable-hover-success-border-color:
 * toastr-info-background-color:
 * toastr-info-border-color:
 * toastr-info-text-color:
 * toastr-icon-info-background-color:
 * toastr-icon-info-color:
 * toastr-destroyable-hover-info-background-color:
 * toastr-destroyable-hover-info-border-color:
 * toastr-warning-background-color:
 * toastr-warning-border-color:
 * toastr-warning-text-color:
 * toastr-icon-warning-background-color:
 * toastr-icon-warning-color:
 * toastr-destroyable-hover-warning-background-color:
 * toastr-destroyable-hover-warning-border-color:
 * toastr-danger-background-color:
 * toastr-danger-border-color:
 * toastr-danger-text-color:
 * toastr-icon-danger-background-color:
 * toastr-icon-danger-color:
 * toastr-destroyable-hover-danger-background-color:
 * toastr-destroyable-hover-danger-border-color:
 * */
@Component({
  selector: 'nb-toast',
  styleUrls: ['./toast.component.scss'],
  templateUrl: './toast.component.html',
})
export class NbToastComponent {
  @Input()
  toast: NbToast;

  @Output() destroy: EventEmitter<void> = new EventEmitter();

  @HostBinding('class.status-success')
  get success(): boolean {
    return this.toast.config.status === 'success';
  }

  @HostBinding('class.status-info')
  get info(): boolean {
    return this.toast.config.status === 'info';
  }

  @HostBinding('class.status-warning')
  get warning(): boolean {
    return this.toast.config.status === 'warning';
  }

  @HostBinding('class.status-primary')
  get primary(): boolean {
    return this.toast.config.status === 'primary';
  }

  @HostBinding('class.status-danger')
  get danger(): boolean {
    return this.toast.config.status === 'danger';
  }

  @HostBinding('class.destroy-by-click')
  get destroyByClick(): boolean {
    return this.toast.config.destroyByClick;
  }

  @HostBinding('class.has-icon')
  get hasIcon(): boolean {
    return this.toast.config.hasIcon && !!this.toast.config.status;
  }

  @HostBinding('class.custom-icon')
  get customIcon(): boolean {
    return !!this.icon;
  }

  get icon(): string | NbIconConfig {
    return this.toast.config.icon;
  }

  /* @deprecated Use pack property of icon config */
  get iconPack(): string {
    return this.toast.config.iconPack;
  }

  /*
    @breaking-change 5 remove
    @deprecated
  */
  get iconConfig(): NbIconConfig {
    const toastConfig = this.toast.config;
    const isIconName = typeof this.icon === 'string';

    if (!isIconName) {
      return toastConfig.icon as NbIconConfig;
    }

    const iconConfig: NbIconConfig = { icon: toastConfig.icon as string };
    if (toastConfig.iconPack) {
      iconConfig.pack = toastConfig.iconPack;
    }

    return iconConfig;
  }

  @HostListener('click')
  onClick() {
    this.destroy.emit();
  }
}
