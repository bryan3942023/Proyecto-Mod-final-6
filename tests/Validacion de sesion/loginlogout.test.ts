import { driverInstance } from "../../src/core/driver";
import { LoginPage } from "../../src/pages/login.page";
import { userData } from "../../user-data";
import { mainHeader } from "../../src/pages/components/header.page";



describe('Loguearse y cerrar sesion', () => {
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
   
    test('Logout', async () => {
   
        await mainHeader.clickLink('logout');

    const txt = await mainHeader.getLoginTxt();
        expect(txt).toBe("Sign In");
       console.log(txt);
        
    });

   
});