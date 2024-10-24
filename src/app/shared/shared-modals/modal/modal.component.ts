import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  constructor(private router: Router) {}
  activeModal = inject(NgbActiveModal);

  @Input() closeModal!: () => void;
  @Input() name!: string;

  close() {
    this.activeModal.close();
    this.closeModal();
  }
}
