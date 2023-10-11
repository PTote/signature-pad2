import { Component, ViewChild } from '@angular/core';
import { SignaturePadComponent } from './components/signature-pad/signature-pad.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{



  title = 'signature-pad2';
  btnRegistryDisabled: boolean = true;

  base64IMG: string = '';

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

  getBase64(){
    this.base64IMG = this.signaturePadComponent.getBase64();

    console.log(this.base64IMG);
  }

  handlerCanvas(isEmpty: boolean){
   this.btnRegistryDisabled = isEmpty;
  }

}
