import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({

selector:'app-loading',

standalone:true,

imports:[CommonModule],

templateUrl:'./loading.html',

styleUrl:'./loading.css'

})


export class Loading implements OnInit{


particles = Array(25);


messages=[

"Initializing AI weather engine",

"Analyzing atmospheric data",

"Connecting satellite network",

"Generating live forecast"

];


message=this.messages[0];


ngOnInit(){


let i=0;


setInterval(()=>{

i++;

if(i>=this.messages.length)
i=0;


this.message=this.messages[i];


},2000);


}



}