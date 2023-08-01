import { driverInstance } from "../../src/core/driver";
import { LoginPage } from "../../src/pages/login.page";
import { userData } from "../../user-data";
import { mainVendors } from "../../src/pages/components/vendors.page";

describe('Seleccionar, deseleccionar marcas y validar catidad de productos por marca', () => {
    const loginPage: LoginPage = new LoginPage();
    
   
    beforeAll( async () => {
         //await driverInstance.start(userData.browser);
         await driverInstance.start();
        await loginPage.navigateTo(userData.url);
        await loginPage.Login();        
    });

    afterAll(async () => {
       // await driverInstance.closeDriver();

    });
   
    test('Seleccionar y deselecionar Apple', async () => {
   
        const vendor = await mainVendors.clickLink('Apple');
        const txtcantprod = await mainVendors.getcantProductTxt();
        //let cantprod = txtcantprod?.match(/(\d+)/);
    
            console.log(txtcantprod);
       expect(txtcantprod).toContain('9');

      
       // console.log(vendor);
       await mainVendors.clickLink('Apple')
        
    });
    test('Seleccionar y deselecionar Samsung', async () => {
   
        const vendor = await mainVendors.clickLink('Samsung');
        const txtcantprod = await mainVendors.getcantProductTxt();
        console.log(txtcantprod);
        expect(txtcantprod).toContain('7');
        await mainVendors.clickLink('Samsung')
        
    });
    test('Seleccionar y deselecionar Google', async () => {
   
        const vendor = await mainVendors.clickLink('Google');
        const txtcantprod = await mainVendors.getcantProductTxt();
        console.log(txtcantprod);
        expect(txtcantprod).toContain('3');
        await mainVendors.clickLink('Google')
        
    });
    test('Seleccionar y deselecionar OnePlus', async () => {
   
        const vendor = await mainVendors.clickLink('OnePlus');
        const txtcantprod = await mainVendors.getcantProductTxt();
        console.log(txtcantprod);
        expect(txtcantprod).toContain('6');
        await mainVendors.clickLink('OnePlus')
        
    });
   
});