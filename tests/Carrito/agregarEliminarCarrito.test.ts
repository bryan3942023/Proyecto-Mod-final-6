import { driverInstance } from "../../src/core/driver";
import { CheckoutPage } from "../../src/pages/checkout.page";
import { ProductsPage } from "../../src/pages/products.page";
import { LoginPage } from "../../src/pages/login.page";
import { userData } from "../../user-data";
import { shoppingcart } from "../../src/pages/components/shoppingcart.page";
import { mainHeader } from "../../src/pages/components/header.page";

describe('agregar productos al carrito de compras, editar la catidad y eliminar todos los productos del carrito', () => {
    const loginPage: LoginPage = new LoginPage();
    const productsPage: ProductsPage =  new ProductsPage();
    const checkoutPage: CheckoutPage = new CheckoutPage();

    beforeAll( async () => {
        await driverInstance.start(userData.browser);
        await loginPage.navigateTo(userData.url);
        await loginPage.Login();        
    });

    afterAll(async () => {
       // await driverInstance.closeDriver();

    });
    test('agregar productos al carrito', async () => {
        await productsPage.addToCartItem('One Plus 6T');
        await shoppingcart.clickToCloseCart();
        await productsPage.addToCartItem('One Plus 7T');
        await shoppingcart.clickToCloseCart();
        await productsPage.addToCartItem('iPhone 12 Mini')
    });

    test('Editar la catidad de productos', async () => {
        await shoppingcart.clickaddQuantityProduct('One Plus 6T');
        let cantProd = await shoppingcart.getQuantityProduct('One Plus 6T');
        //console.log(cantProd);
        expect(cantProd).toContain('2');
        await shoppingcart.clickaddQuantityProduct('One Plus 7T');
        let cantProd2 = await shoppingcart.getQuantityProduct('One Plus 7T');
        //console.log(cantProd2);
        expect(cantProd2).toContain('2');
        await shoppingcart.clickremoveQuantityProduct('One Plus 7T');
         cantProd2 = await shoppingcart.getQuantityProduct('One Plus 7T');
        //console.log(cantProd2);
         expect(cantProd2).toContain('1');
    });

    //aumentar el proceso de comprar y cerrado de sesion
    test('realizar el checkout', async () => {  
       //await favourites.openCart();
        await shoppingcart.clickCheckoutButton();
        await checkoutPage.checkoutInformation('Bryan', 'Felipez','Street Test','State Test', '00000');
        const actualCompleteMessage = await checkoutPage.getCompleteOrderMessage();
        expect(actualCompleteMessage).toBe('Your Order has been successfully placed.');
        const  totalA = await checkoutPage.checkoutTotal();
        console.log(totalA);
        
        const  totalSumProducts = await checkoutPage.calculateTotal();
        expect(Number(totalA)).toBe(Number(totalSumProducts));
        
        await checkoutPage.clickFinishOrderButton();

    });

    test('Logout', async () => {
   
        await mainHeader.clickLink('logout');

    const txt = await mainHeader.getLoginTxt();
        expect(txt).toBe("Sign In");
       console.log(txt);
        
    });


});