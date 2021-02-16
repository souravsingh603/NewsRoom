import { LightningElement,track } from 'lwc';
import retriveNews from '@salesforce/apex/newsController.retriveNews';
export default class NewsComponent extends LightningElement {

    @track result = [];
    @track selectedNews={};
    @track isModalOpen = false;
    get modalClass(){
        return this.isModalOpen ?"slds-modal slds-fade-in-open":"slds-modal"
    }
    get modalBackdropClass(){
        return this.isModalOpen ? "slds-backdrop slds-backdrop_open" : "slds-backdrop"
    }
    connectedCallback(){
        this.fetchNews();
    }
    fetchNews(){
        retriveNews().then(response=>{
            console.log(response);
            this.formatNewsData(response.articles);
        }).catch(error=>{
            console.log(error);
        })
    }
    formatNewsData(res){
       this.result= res.map((item,index)=>{
            let id = `new_${index+1}`
            let name = item.source.name;
            let date = new Date(item.publishedAt).toDateString();
            return {...item,id:id,name:name,date: date}
        })
    }
    showModal(event){
        let id = event.target.dataset.item;
        this.result.forEach(item=> {
           if(item.id === id){
                this.selectedNews = {...item}
            }
        })

        this.isModalOpen = true; 
    }
    closeModal(){
        this.isModalOpen = false;
    }
}