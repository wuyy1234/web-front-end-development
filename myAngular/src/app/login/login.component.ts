import { Component, OnInit } from '@angular/core';
import { FormControl ,FormGroup,FormBuilder} from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {PeopleService} from '../people.service';
import {LoginPost} from './LoginPost'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  
  constructor(
    private http: HttpClient,
    private peopleService:PeopleService,
    private fb: FormBuilder
  ) { }
  
  loginForm=this.fb.group({
    inputName:[''],
  })  


  
  
  onSubmit(){
    let urlTemp="https://swapi.co/api/login/";
    console.log("submit:"+this.loginForm.value.inputName)
    let httpopt=this.peopleService.httpOptions

    let loginPost={name:this.loginForm.value.inputName}

    ///////test
    this.peopleService.auth=this.loginForm.value.inputName
    console.log("this.peopleService.auth set :"+this.peopleService.auth)

    /*以json方式提交name*/
    this.http.post(urlTemp,loginPost,httpopt).subscribe(
      (val)=>{
        /*设置收到的认证码*/
        this.peopleService.auth=val.toString()
        console.log('post return value:'+val.toString())
      },
      (error)=>{
        console.log('post error:'+error.message)
      },
      ()=>{
        console.log("post complete")
      }
    )
    
  }
  
  ngOnInit() {
  }
}
