import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserCobosService } from 'src/app/services/user-cobos.service';
import {HttpClient} from '@angular/common/http';

interface Coin{
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number
  price_change_percentage_24h: number
  total_volume: number
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  coins: Coin[] = [];
  titles: string [] = [
    '#',
    'Coin',
    'Price',
    'Price Change',
    '24h Volume',
  ];
  public users:any = [];
  public role!:string;
  public fullName : string = "";
  constructor(private auth: AuthService,
              private userCobos:UserCobosService,
              private api:ApiService,
              private http: HttpClient
  ){}

  ngOnInit(){
    this.http.get<Coin[]>('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .subscribe(res => {console.log(res); this.coins = res
      },
      (err) => console.log(err)
      );
    // this.api.getUsers()
    // .subscribe(res =>{
    //   this.users = res;
    // });

    this.userCobos.getFullNameFromStore()
    .subscribe(val=>{
      const fullNameFromToken = this.auth.getfullNameFromToken();
      this.fullName = val || fullNameFromToken
    });

    this.userCobos.getRoleFromStore()
    .subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })

  }

}
