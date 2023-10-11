import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-signature-pad',
  templateUrl: './signature-pad.component.html',
  styleUrls: ['./signature-pad.component.css']
})
export class SignaturePadComponent   {

  @ViewChild('canvas') private canvas!: ElementRef;
  private signaturePad!: SignaturePad;
  private ctx!: CanvasRenderingContext2D;

  private screenWidth!: number;
  private screenHeight!: number;
  private validateSignaturePadEmpty: boolean = true;

  @Output() signaturePadEmpty = new EventEmitter<boolean>();

  private deviceBreakpoints = {
    s: 320,
    sm: 480,
    m: 692,
    x: 992,
    xl: 1024,
    xxl: 1920,
  };

  private ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.signaturePadHandler()

    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.resizeCanvas();
    this.signaturePadEmpty.emit(this.validateSignaturePadEmpty);
  }




  private signaturePadHandler(): void {
    const canvas = document.getElementById('signature_pad') as HTMLCanvasElement;

    if (canvas) {
      this.signaturePad = new SignaturePad(canvas)
    }

    this.signaturePad.addEventListener("beginStroke", () => {
      this.validateSignaturePadEmpty = false;
      this.signaturePadEmpty.emit(this.validateSignaturePadEmpty);
    })

  }

  @HostListener('window:resize', ['$event'])
  private onResize(event: any): void {
    this.getScreenSize()
  }

  private getScreenSize(): void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.resizeCanvas();
  }


  public onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }


  public onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer?.files;

    if (files && files.length > 0) {
      const file = files[0];
      this.loadImageFromFile(file);
    }
  }

  private loadImageFromFile(file: File): void {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const image = new Image();
      image.src = e.target.result;
      this.signaturePad.fromDataURL(e.target.result, { ratio: 1, width: 100, height: 100, xOffset: 100, yOffset: 50 });
    };

    reader.readAsDataURL(file);

  }

  private resizeCanvas(): void {

    if (this.screenWidth >= this.deviceBreakpoints.s && this.screenWidth <= this.deviceBreakpoints.sm) {
      this.ctx.canvas.width = 186;
      this.ctx.canvas.height = 132;
    }

    if (this.screenWidth >= this.deviceBreakpoints.sm && this.screenWidth <= this.deviceBreakpoints.m) {
      this.ctx.canvas.width = 286
      this.ctx.canvas.height = 166
    }

    if (this.screenWidth >= this.deviceBreakpoints.m && this.screenWidth <= this.deviceBreakpoints.x) {
      this.ctx.canvas.width = 486
      this.ctx.canvas.height = 200
    }

    if (this.screenWidth >= this.deviceBreakpoints.x) {
      this.ctx.canvas.width = 686;
      this.ctx.canvas.height = 234;
    }

  }



  public signaturePadClear(): void {
    this.signaturePad.clear();
    this.validateSignaturePadEmpty = true;
    this.signaturePadEmpty.emit(this.validateSignaturePadEmpty);
  }


  public saveSignatureJPG(): void {
    const signatureImage = this.canvas.nativeElement.toDataURL('image/jpeg');
    const a = document.createElement('a');
    a.href = signatureImage;
    a.download = 'signature.jpg'
    console.log(a.download);
    a.click();
  }

  public saveSignaturePNG(): void {
    const signatureImage = this.canvas.nativeElement.toDataURL();
    const a = document.createElement('a');
    a.href = signatureImage;
    a.download = 'signature.png'
    a.click();
  }

  public saveSignatureSVG(): void {
    const signatureImage = this.canvas.nativeElement.toDataURL("image/svg+xml");
    const a = document.createElement('a');
    a.href = signatureImage;
    a.download = 'signature.svg'
    a.click();
  }

  public getBase64(): string {
    const signatureImage = this.canvas.nativeElement.toDataURL();
    return signatureImage;
  }



}
