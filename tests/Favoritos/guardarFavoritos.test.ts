import { driverInstance } from "../../src/core/driver";
import { CheckoutPage } from "../../src/pages/checkout.page";
import { ProductsPage } from "../../src/pages/products.page";
import { LoginPage } from "../../src/pages/login.page";
import { userData } from "../../user-data";
import { FavouritesPage } from "../../src/pages/favourites.page";
import { shoppingcart } from "../../src/pages/components/shoppingcart.page";
import { mainHeader } from "../../src/pages/components/header.page";



describe('agregar productos a Favoritos y desde agregarlos al carrito y realizar la compra', () => {
    const loginPage: LoginPage = new LoginPage();
    const productsPage: ProductsPage =  new ProductsPage();
    const favourites: FavouritesPage =new FavouritesPage();
    const checkoutPage: CheckoutPage = new CheckoutPage();
    
   
    beforeAll( async () => {
         //await driverInstance.start(userData.browser);
         await driverInstance.start();
        await loginPage.navigateTo(userData.url);
        await loginPage.Login();        
    });

    afterAll(async () => {
        //await driverInstance.closeDriver();

    });
    test('agregar 2 productos a favoritos', async () => {
        await productsPage.addItemToFavourites('One Plus 6T');
        await productsPage.addItemToFavourites('One Plus 7T');


    });


    test('navegar a la pagina favoritos', async () => {
        //await productsPage.clickfavouritesLink();
        await mainHeader.clickLink('favourites');
        const totalProducts = await favourites.getcountProducts();
           expect(totalProducts).toBe(2);
    });

    test('agregar productos desde la pagina favoritos al carrito, y realizar el checkout', async () => {  
        await favourites.addToCartItem('One Plus 6T');
        await shoppingcart.clickToCloseCart();
        await favourites.addToCartItem('One Plus 7T');
        //await shoppingcart.clickRemoveProduct('One Plus 6T');
        const badge = await shoppingcart.getshoppingCartBadge();
        expect(badge).toBe("2");

       //await favourites.openCart();
        await shoppingcart.clickCheckoutButton();
        await checkoutPage.checkoutInformation('Bryan', 'Felipez','Street Test','State Test', '00000');
        const actualCompleteMessage = await checkoutPage.getCompleteOrderMessage();
        expect(actualCompleteMessage).toBe('Your Order has been successfully placed.');
        const  totalA = await checkoutPage.checkoutTotal();
        console.log(totalA);
        
        const  totalSumProducts = await checkoutPage.calculateTotal();
        // console.log(totalSumProducts);
       //  console.log(totalA);
        expect(Number(totalA)).toBe(Number(totalSumProducts));
        
        await checkoutPage.clickFinishOrderButton();

    });
    test('navegar a la pagina Favoritoss y eliminar de favoritos', async () => {
        //await productsPage.clickfavouritesLink();
        await mainHeader.clickLink('favourites');
        let totalProducts = await favourites.getcountProducts();
           expect(totalProducts).toBe(2);
           await favourites.itemremoveFavourites('One Plus 6T');
           await favourites.itemremoveFavourites('One Plus 7T');
           totalProducts = await favourites.getcountProducts();
           expect(totalProducts).toBe(0);
    });

});