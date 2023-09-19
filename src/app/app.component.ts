import { Component, ViewChild } from '@angular/core';
import { SignaturePadComponent } from './components/signature-pad/signature-pad.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'signature-pad2';

  @ViewChild('signaturePad') signaturePadComponent!: SignaturePadComponent;



  clearSignaturePad() {
    this.signaturePadComponent.signaturePadClear();
  }

  saveSignaturePNG() {
    this.signaturePadComponent.saveSignaturePNG();
  }

  saveSignatureJPG() {
    this.signaturePadComponent.saveSignatureJPG();
  }

  saveSignatureSVG() {
    this.signaturePadComponent.saveSignatureSVG();
  }

}
