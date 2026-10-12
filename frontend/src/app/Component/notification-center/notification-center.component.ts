import {Component , OnDestroy, OnInit} from '@angular/core';
import {NotificationService } from "../../service/notification.service" ;
import { UserNotification, NotificationPreferences} from "../../model/notification.model" ;
import {HttpClient} from "@angular/common/http";
import { Subscription, interval } from "rxjs";
import { TranslationService } from "../../service/translation.service";

@Component( {
  selector : "app-notification-center" ,
  templateUrl : "./notification-center.component.html",
  styleUrls:["./notification-center.component.css"],
})
export class NotificationCenterComponent implements OnInit{
  notifications: UserNotification[]= [];
  unreadCount= 0 ;
  isLoading = true;
  activeFilter= "ALL";
  showUnreadOnly =false;
  activeTab : 'inbox' | 'preferences' | 'simulator' ="inbox";

  currentCustomerId = '' ;
  customerEmail = "";

  preferences : NotificationPreferences={
    preferredLanguage: "en",
    channels : { email:true , push: true,sms : false},
    eventSubscriptions : {
      bookingUpdates: true,
      journeyReminders:true ,
      scheduleChanges : true,
      promotions: true,
    }
  };

  testSimulator ={
    eventType: "JOURNEY_REMINDER" ,
    departure : "Delhi",
    destination:"Jaipur" ,
    busName : "IntrCity SmartBus",
    time :'09:30 PM',
    boardingPoint: "Kashmere Gate ISBT",
    pnr : "RB-998877" ,
    promoCode: 'REDSAVE25',
    discountPercentage:25 ,
    newTime : "10:15 PM"
  };

  toastAlert = '';
  private refreshSubscription?: Subscription;

  constructor (
    private notificationService : NotificationService ,
    private http: HttpClient,
    private i18n: TranslationService
  ) {}

  ngOnInit(): void {
    this.fetchInitialUserAndData();
    this.refreshSubscription = interval(15000).subscribe(() => {
      if (this.currentCustomerId && this.activeTab === 'inbox') this.loadNotifications();
    });
  }

  ngOnDestroy(): void {
    this.refreshSubscription?.unsubscribe();
  }

  fetchInitialUserAndData():void{
    const rawUser = sessionStorage.getItem('Loggedinuser');

    if (!rawUser) {
      this.isLoading = false;
      this.triggerToast(this.i18n.translate('NOTIFICATIONS.TOAST_SIGN_IN_FIRST'));
      return;
    }

    try {
      const user = JSON.parse(rawUser);
      this.currentCustomerId = user?._id || '';
      this.customerEmail = user?.email || '';

      if (!this.currentCustomerId) {
        throw new Error('Signed-in customer ID is missing.');
      }

      this.loadNotifications();
      this.loadPreferences();
      this.notificationService.registerBrowserPush(this.currentCustomerId).catch(() => {});
    } catch {
      this.currentCustomerId = '';
      this.isLoading = false;
      this.triggerToast(this.i18n.translate('NOTIFICATIONS.TOAST_SESSION_INVALID'));
    }
  }

  loadNotifications() : void{
    if(!this.currentCustomerId) return;
    this.isLoading =true ;
    this.notificationService
      .getUserNotifications(this.currentCustomerId , this.showUnreadOnly,this.activeFilter )
      .subscribe( {
        next :res =>{
          this.notifications =res.data  || [];
          this.unreadCount = res.unreadCount ||  0 ;
          this.isLoading= false;
        },
        error :()=> {
          this.isLoading =false ;
          this.triggerToast(this.i18n.translate('NOTIFICATIONS.TOAST_LOAD_FAILED')) ;
        }
      } );
  }

  loadPreferences():void {
    if(!this.currentCustomerId )  return;
    this.notificationService.getPreferences( this.currentCustomerId ).subscribe({
      next: res=>{
        if ( res.data){
          this.preferences = res.data;
        }
      }
    } );
  }

  savePreferences() : void{
    // Language is saved from the language selector; never send a possibly stale copy from here.
    const payload: any = { ...this.preferences };
    delete payload.preferredLanguage;
    this.notificationService.updatePreferences( this.currentCustomerId , payload).subscribe( {
      next:res => {
        this.triggerToast(this.i18n.translate('NOTIFICATIONS.TOAST_PREFS_SAVED'));
      },
      error: ()=> this.triggerToast( this.i18n.translate('NOTIFICATIONS.TOAST_PREFS_FAILED'))
    }) ;
  }

  onMarkRead( item : UserNotification):void{
    if ( item.isRead ) return;
    this.notificationService.markAsRead(item._id, this.currentCustomerId).subscribe({
      next: ()=>{
        item.isRead = true;
        this.unreadCount= Math.max(0,this.unreadCount - 1);
      }
    });
  }


  onMarkAllRead() : void{
    this.notificationService.markAllAsRead( this.currentCustomerId).subscribe( {
      next :()=>{
        this.notifications.forEach( n=> (n.isRead =true)) ;
        this.unreadCount = 0;
        this.triggerToast(this.i18n.translate('NOTIFICATIONS.TOAST_ALL_READ'));
      }
    });
  }

  onRetry( item :UserNotification ,event: Event) :void{
    event.stopPropagation();
    this.notificationService.retryNotification(item._id, this.currentCustomerId).subscribe( {
      next: res => {
        const index=this.notifications.findIndex(n=>  n._id === item._id);
        if ( index !== -1){
          this.notifications[ index ]= res.data;
        }
        this.triggerToast(this.i18n.translate('NOTIFICATIONS.TOAST_RETRY_DONE'));
      } ,
      error: err =>this.triggerToast( err.error?.message || this.i18n.translate('NOTIFICATIONS.TOAST_RETRY_FAILED'))
    } );
  }

  sendSimulatedNotification(): void{
    const payload={
      recipientId : this.currentCustomerId,
      eventType:this.testSimulator.eventType ,
      templateData :{ ...this.testSimulator},
      metadata: {
        pnr: this.testSimulator.pnr,
        promoCode:this.testSimulator.promoCode ,
        discountPercentage  : this.testSimulator.discountPercentage
      },
    };

    this.notificationService.triggerTestNotification(payload).subscribe( {
      next : res=> {
        this.triggerToast(this.i18n.translate('NOTIFICATIONS.TOAST_SENT'));
        this.loadNotifications();
        this.activeTab = 'inbox' ;
      },
      error : err =>this.triggerToast(err.error?.message  ||  this.i18n.translate('NOTIFICATIONS.TOAST_SIM_FAILED'))
    });
  }

  setFilter(filter : string):void{
    this.activeFilter=filter;
    this.loadNotifications();
  }


  toggleUnreadFilter() :void {
    this.showUnreadOnly= !this.showUnreadOnly;
    this.loadNotifications() ;
  }

  getBadgeClass(type: string): string {
    switch (type) {
      case "BOOKING_CONFIRMATION": return "badge-confirm" ;
      case "BOOKING_CANCELLATION" :return "badge-cancel";
      case 'SCHEDULE_CHANGE':return "badge-schedule";
      case "JOURNEY_REMINDER": return "badge-reminder";
      case "PROMOTIONAL_OFFER" : return 'badge-promo' ;
      default :return "badge-default";
    }
  }

  triggerToast(msg:string):void{
    this.toastAlert = msg;
    setTimeout(()=> {
      this.toastAlert = "";
    } ,4000) ;
  }
}