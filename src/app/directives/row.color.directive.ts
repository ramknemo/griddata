import { Directive, Input, TemplateRef, ViewContainerRef,ElementRef, Renderer2} from '@angular/core';
 
@Directive({ selector: '[rowColorAttr]' })
export class RowColorDirective {
    constructor(private elementRef: ElementRef, private renderer: Renderer2) 
    { }
    private usedColor:string = "rgb(236, 233, 233)";
    @Input() set rowColorAttr(index: number) {
        
         if (index%2==0) {

            //this.renderer.setStyle(this.elementRef.nativeElement, "background-color", this.usedColor);
            //console.log("dir: "+index);
        }else{

        }
    }
}