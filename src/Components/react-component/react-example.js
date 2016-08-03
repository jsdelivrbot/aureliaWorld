import {Router} from 'aurelia-router';

export class ReactExample {
    static inject() { return [Router]; }

    reportData = [];

    constructor(router) {
        this.reportData = [
            {key : 1,name : 'test1',itemname : 'item1',price : 10, data:'one'},
            {key : 2,name : 'test2',itemname : 'item2',price : 20 ,data:'two' },
            {key : 3,name : 'test3',itemname : 'item3',price : 30,data:'three' },
            {key : 4,name : 'test4',itemname : 'item4',price : 40,data:'four' },
        ];
        this.theRouter = router;

         this.data = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "My First dataset",
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1,
                    data: [65, 59, 80, 81, 56, 55, 40],
                }
            ]
        };
    }
  xfun(key){
      this.theRouter.navigate("release/:"+key);
  }


}