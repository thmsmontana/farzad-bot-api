/**
 * Rest level class with methods for authorization.
 */
export default class UserApi {
    constructor (app, service) {
        this.app = app;
        this.service = service;
    }

    /**
     * Authorization routes list
     */
    register = () => {
        this.app.post('/user/sign-up', (req, res) => this.service.createUser(req, res));
        this.app.post('/user/login', (req, res) => this.service.login(req, res));
    }
}