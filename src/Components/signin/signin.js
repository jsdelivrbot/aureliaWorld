import {Router} from 'aurelia-router';

export class Signin {

    static inject() { return [Router]; }

    constructor(router){
        this.theRouter = router;
    }

    loginFunction(){
        this.theRouter.navigate("dashboard");
    }
}