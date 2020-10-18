import * as bodyParser from 'body-parser';
import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';

// declare metadata by @controller annotation
import "./Controllers/TemperatureController";
import "./Controllers/TvShowController";
import "./Controllers/UserController";
import { IOC } from './IocContainer/IOC';
import { AuthProvider } from '../InversifyExpressExample.Domain/Auth/AuthProvider';
try {
    // set up bindings
    let ioc = new IOC();
    let container = ioc.GetInstance();

    // create server
    let server = new InversifyExpressServer(container, null, null, null, AuthProvider);
    server.setConfig((app) => {
        // add body parser
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        app.use(bodyParser.json());
    });

    let app = server.build();
    app.listen(4000);
}
catch (e) {
    console.log(e);
}
