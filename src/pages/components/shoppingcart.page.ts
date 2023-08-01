 import { ElementActions } from "../../core/element-actions";
import { BasePage } from "../base.page";


export class shoppingcartPage extends BasePage{
    private shoppingCartBadge: string = 'span.bag__quantity';
    private closeCart:string='div.float-cart__close-btn';
    private checkoutButton: string = '.buy-btn';
    private QuantityProduct = (product: string) => `//p[text()='${product}']//ancestor::div[@class='shelf-item']//div[@class='shelf-item__details']//p[2]`;
    

    
    private addQuantityProduct = (product: string) =>`//p[text()='${product}']//ancestor::div[@class='shelf-item']//button[text()='+']`;
    private removeQuantityProduct =(product: string) =>`//p[text()='${product}']//ancestor::div[@class='shelf-item']//button[text()='-']`;;


    private removeProduct = (product: string) =>`//p[text()='${product}']//ancestor::div[@class='shelf-item']//div[@class='shelf-item__del']`;
    private locatorRemoveProduct= (number: string) =>`(//div[@class="shelf-item__del"])['${number}']`;

    

    constructor(){
        super();
    }

    async getshoppingCartBadge() {
        
        return ElementActions.textContent(this.shoppingCartBadge);
    }
    async clickToCloseCart() {
            return ElementActions.click(this.closeCart);
    }
    async clickCheckoutButton() {
        return  await ElementActions.click(this.checkoutButton);
    }


    async clickShoppingCartBadge() {
        return await ElementActions.click(this.shoppingCartBadge);
    }


    async clickRemoveProduct(product: string){
        await ElementActions.click(this.removeProduct(product));
    }

    async removeAllProducts(){
        const cantProd=Number(await this.getshoppingCartBadge());
        for (let index = 1; index <= cantProd; index++) {
        await ElementActions.click(this.locatorRemoveProduct(String(index)));
        }
        
    }
    async clickaddQuantityProduct(product: string){
        await ElementActions.click(this.addQuantityProduct(product));
    }
    async clickremoveQuantityProduct(product: string){
        await ElementActions.click(this.removeQuantityProduct(product));
    }

    async getQuantityProduct(product: string){
        return await ElementActions.innerText(this.QuantityProduct(product));
    }

}
export const shoppingcart= new shoppingcartPage();