import { LightningElement } from 'lwc';
import signinTemplate from './signinTemplate.html';
import signupTemplate from './signupTemplate.html';
import defaultTemplate from './renderMultipleDemo.html';

export default class RenderMultipleDemo extends LightningElement {

    selected = null;

    render(){
        return this.selected === 'Sign In' ?  signinTemplate : this.selected === 'Sign Up' ?
         signupTemplate : defaultTemplate
    }
    handleClick(event){

        this.selected = event.target.label ;
    }
    submitHandler(event){
        if(event.target.label === "Sign In" ){
            console.log('Signed in Successfully')
        }
        else if(event.target.label === "Sign Up"){
            console.log("Signed Up Successfully")
        }
        else{}
        
    }
}