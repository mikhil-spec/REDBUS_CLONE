import {Injectable } from "@angular/core" ;
import { HttpClient } from "@angular/common/http";
import {BehaviorSubject , Observable} from "rxjs";
import { url } from "../config";

@Injectable( {
  providedIn : "root" ,
})
export class ThemeService{
  private readonly storageKey = "redbus_theme_mode";
  private readonly apiBaseUrl = `${url}/api/customer`;

  private isDarkModeSubject = new BehaviorSubject<boolean>(false);
  public isDarkMode$: Observable<boolean> = this.isDarkModeSubject.asObservable();

  private activeUserId : string | null = null;

  constructor(private http:HttpClient){
    this.initTheme();
  }

  private initTheme() :void{
    const savedTheme = localStorage.getItem(this.storageKey);
    if(savedTheme){
      this.applyTheme(savedTheme === "dark");
    } else{
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      this.applyTheme(prefersDark);
    }
  }

  public setUserId(userId: string) :void{
    this.activeUserId = userId;
    // Read the account's current theme on every load, so a choice made on another device applies here.
    this.http.get<any>(`${this.apiBaseUrl}/${userId}`).subscribe({
      next: (response) => {
        const serverTheme = response?.data?.themePreference;
        if (serverTheme === "light" || serverTheme === "dark") {
          this.setTheme(serverTheme === "dark", false);
        } else if (localStorage.getItem(this.storageKey) !== null) {
          // The account has no theme yet: save the choice made on this device to the account.
          this.setTheme(this.isDark(), true);
        }
      },
      error: () => {},
    });
  }

  public isDark() : boolean {
    return this.isDarkModeSubject.getValue();
  }

  public toggleTheme():void{
    this.setTheme(!this.isDark());
  }

  public setTheme(isDark : boolean, syncRemote : boolean = true):void {
    this.applyTheme(isDark);
    localStorage.setItem(this.storageKey , isDark ? "dark" : 'light');

    if(syncRemote  && this.activeUserId) {
      const themeValue = isDark ? "dark" : "light";
      this.http
        .put(`${this.apiBaseUrl}/${this.activeUserId}/theme`, {theme:themeValue} )
        .subscribe({
          next :()=> {},
          error : (err)=> console.warn('[ThemeService] Remote theme sync failed:' ,err?.message)
        });
    }
  }

  public syncFromUserRecord(themePreference? : string): void {
    if(themePreference && (themePreference ===  "light"  || themePreference === "dark")){
      const isDark = themePreference=== "dark" ;
      this.setTheme(isDark , false);
    }
  }

  private applyTheme(isDark : boolean):void{
    this.isDarkModeSubject.next(isDark);
    if(isDark){
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark-theme" );
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark-theme");
    }
  }
  
}