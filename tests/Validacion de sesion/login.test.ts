import { driverInstance } from "../../src/core/driver";
import { LoginPage } from "../../src/pages/login.page";


describe('Loguearse a la pagina StackDemo', () => {
   let loginPage: LoginPage;

    beforeAll(async () => {              
        await driverInstance.start();
        loginPage = new LoginPage();  
        
       
    }, 35000);

    afterAll(async () => {
        await driverInstance.closeDriver();
    });

    it('Ir a la pagina de login', async () => {
        await loginPage.navigateTo('https://bstackdemo.com/signin');
    });
    


    it('Seleccionar usuario', async () => {
        
        await loginPage.setUsername();
    });
      
 
    it('Seleccionar password', async () => {

        await loginPage.setPassword();
    });

    it('Presionar boton login', async () => {
       
        await loginPage.clickButton();
    });

    it('Cerrar el navegador', async () => {
       
        await loginPage.close();
    });
});