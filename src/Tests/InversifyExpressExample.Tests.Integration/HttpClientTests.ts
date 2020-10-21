import "reflect-metadata";
import { expect } from "chai";
import { HttpClient } from "../../InversifyExpressExample.Repositories/Client/HttpClient"

describe('HttpClient Tests', () => {
    it('Get should get data', async () => {
        //Arrange
        let client = new HttpClient();

        //Act
        let response = await client.Get<string>('https://www.google.com');

        //Assert
        expect(response).to.not.be.null;
    })
})