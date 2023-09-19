import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-signature-pad',
  templateUrl: './signature-pad.component.html',
  styleUrls: ['./signature-pad.component.css']
})
export class SignaturePadComponent implements OnInit {

  @ViewChild('canvas') canvas!: ElementRef;
  signaturePad!: SignaturePad;
  private ctx!: CanvasRenderingContext2D;

  screenWidth!: number;
  screenHeight!: number;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.signaturePadHandler()
  }


  signaturePadHandler() {
    const canvas = document.getElementById('signature_pad') as HTMLCanvasElement;

    if (canvas) {
      this.signaturePad = new SignaturePad(canvas)
    }


  }

   // Manejador para el evento "dragover"
   onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  // Manejador para el evento "drop"
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer?.files;

    if (files && files.length > 0) {
      const file = files[0]; // Supongamos que solo se permite una imagen a la vez
      this.loadImageFromFile(file);
    }
  }

  // Carga la imagen desde el archivo y la muestra en el canvas
  loadImageFromFile(file: File) {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const image = new Image();
      image.src = e.target.result;
      this.signaturePad.fromDataURL(e.target.result, { ratio: 1, width: 100, height: 100, xOffset: 100, yOffset: 50 });

      // image.onload = () => {
      //   this.ctx.drawImage(image, 0, 0); // Dibuja la imagen en el canvas
      // };
    };

    reader.readAsDataURL(file);

  }

  resizeCanvas() {
    const canvas = document.getElementById('signature_pad') as HTMLCanvasElement;

    if (canvas) {
      var ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
    }


  }



  signaturePadClear() {
    this.signaturePad.clear();
  }


  saveSignatureJPG() {
    const signatureImage = this.canvas.nativeElement.toDataURL('image/jpeg');
    const a = document.createElement('a');
    a.href = signatureImage;
    a.download = 'signature.jpg'
    console.log(a.download);
    a.click();
  }

  saveSignaturePNG() {
    const signatureImage = this.canvas.nativeElement.toDataURL();
    const a = document.createElement('a');
    a.href = signatureImage;
    a.download = 'signature.png'
    a.click();
  }

  saveSignatureSVG() {
    const signatureImage = this.canvas.nativeElement.toDataURL("image/svg+xml");
    const a = document.createElement('a');
    a.href = signatureImage;
    a.download = 'signature.svg'
    a.click();
  }


}
