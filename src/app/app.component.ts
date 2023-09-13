import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'code-chalenge';

  apiResponse: any = {};
  Result: any = {};
  intervalCal: any = {};


  lastResultList: any[] = [];

  isChalengMode = false;

  TimeDuration = 5000;
  TimeLimitCall = 15000;

  testValue:any={}
  constructor(private appService: AppService) {

  }


  ngOnInit(): void {
    this.lastResultList = [];
    //this.callForTest()
    //this.addExistLogArray();
    // this.addArrayFromResponse();
    // this.addArrayFromResponse()
  }

  callForTest() {

    this.apiResponse = this.testValue;
    this.Result = "TestResult"
  }



  resultCalc(res: any) {
    if (res == 'ApiFail' || res == 'NotValidData') {
      return
    }
    let result = "success"

    return result;
  }

  getApiResult() {
    this.appService.getApi().subscribe((res) => {
      if (this.checkApiIsvalid(res)) {
        this.apiResponse = res;
        this.lastResultList.push({ res: res });
        this.ApiAction();
      }

    }, (error: any) => {
      this.apiResponse = 'ApiFail';
      this.lastResultList.push({ res: this.apiResponse });
      this.Result = 'Error';

      this.lastResultList[this.lastResultList.length - 1]['Result'] = this.Result;
      this.lastResultList[this.lastResultList.length - 1]['Type'] = 1;
    })
  }


  ApiAction() {
    this.Result = this.resultCalc(this.apiResponse);
    this.lastResultList[this.lastResultList.length - 1]['Result'] = this.Result;
    this.lastResultList[this.lastResultList.length - 1]['Type'] = 3;
  }


  checkApiIsvalid(res: any) {

    if (this.apiResponse == res) {
      this.lastResultList[this.lastResultList.length - 1]['NotValidData'] = this.Result;
      this.lastResultList[this.lastResultList.length - 1]['Type'] = 2;
      return false
    }

    return true
  }


  callBySec(milisec: number) {
    this.intervalCal = setInterval(() => {
      this.getApiResult();
    }, milisec)
  }

  clearApiCalBySec(milisec: number) {
    setTimeout(() => {
      this.clearInterval()
    }, milisec);
  }

  clearInterval() {
    if (this.intervalCal) {
      clearInterval(this.intervalCal)
      this.isChalengMode = false;
    }

  }


  LogSuccessApi() {
    let filterList = this.lastResultList.filter((item) => item.Type == 3);
    console.log('JustSecces');
    console.log(filterList);
    console.log(JSON.stringify(filterList));
  }

  LogAllResponse() {
    let list = [];
    for (let item of this.lastResultList) {
      if (item['res']) {
        list.push(item['res'])
      }
    }
    console.log('JustReponse');
    console.log(list);
    console.log(JSON.stringify(list));

  }

  LogAllApi() {
    console.log('AllLogs');
    console.log(this.lastResultList);
    console.log(JSON.stringify(this.lastResultList));
  }

  Reset() {
    this.clearInterval();
    this.lastResultList = [];
  }

  addExistLogArray(newList: any[]) {

    for (let item of newList) {
      this.lastResultList.push(item);
    }
  }

  addArrayFromResponse(responseList: any[]) {
    for (let item of responseList) {
      this.lastResultList.push({});
      this.Result = this.resultCalc(item);
      this.lastResultList[this.lastResultList.length - 1]['Result'] = this.Result;
      this.lastResultList[this.lastResultList.length - 1]['res'] = item;
      if (item == 'NotValidData') {
        this.lastResultList[this.lastResultList.length - 1]['Type'] = 2;
      }
      else if (item == 'ApiFail') {
        this.lastResultList[this.lastResultList.length - 1]['Type'] = 1;
      }
      else {
        this.lastResultList[this.lastResultList.length - 1]['Type'] = 3;
      }

    }
  }

  ToggleChaleng() {
    this.isChalengMode = !this.isChalengMode;

    if (this.isChalengMode) {
      this.callBySec(this.TimeDuration);
      this.clearApiCalBySec(this.TimeLimitCall)
    }
    else {
      this.clearInterval()
    }
  }

}
