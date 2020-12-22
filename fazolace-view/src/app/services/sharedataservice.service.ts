import {Injectable} from '@angular/core'
import {BehaviorSubject} from 'rxjs'


@Injectable()
export class SharedDataService {

    private messageSource = new BehaviorSubject <string>(localStorage.getItem('user_name'));
    currentMessage=this.messageSource.asObservable();

    private changeViewName=new BehaviorSubject<string>("List Friend");
    currentView=this.changeViewName.asObservable();

    private conFirm=new BehaviorSubject<string>("");
    currentconFirm=this.conFirm.asObservable();

    private count=new BehaviorSubject<number>(0);
    currentcount=this.count.asObservable();
    
    constructor(){}

    changeMessage(message: string){
        this.messageSource.next(message)
    }

    changeView(message){
        this.changeViewName.next(message)
    }

    changeConfirm(message){
        this.conFirm.next(message)
    }

    ChangeCounts(message){
        this.count.next(message)
    }
}