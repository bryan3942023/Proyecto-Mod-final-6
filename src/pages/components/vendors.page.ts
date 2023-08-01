import { ElementActions } from "../../core/element-actions";
import { BasePage } from "../base.page";


export class vendorsPage extends BasePage{
    private appleLink:string='//span[text()=\'Apple\']';
    private samsungLink:string="//span[text()='Samsung']";
    private googleLink:string="//span[text()='Google']";
    private onePlusLink:string="//span[text()='OnePlus']";
    private cantProducts:string ="//small[@class='products-found']//span[1]";
    private products:string =".shelf-item img";

    constructor(){
        super();
    }
    async clickLink(link:string) {
        switch (link) {
            case 'Apple':
            return ElementActions.click(this.appleLink);
            break;
            case 'Samsung':
            return ElementActions.click(this.samsungLink);
            break;
            case 'Google':
            return ElementActions.click(this.googleLink);
            break;
            case 'OnePlus':
            return ElementActions.click(this.onePlusLink);
            break;
    }
    }
    async getcantProductTxt() {
      //  if(await ElementActions.isElementVisible(this.products)){
 
      await ElementActions.waitForTimeout(6000);
        return ElementActions.textContent(this.cantProducts);
    //}
    }

}
export const mainVendors= new vendorsPage();