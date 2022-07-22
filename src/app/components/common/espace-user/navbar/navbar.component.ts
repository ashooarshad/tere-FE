import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthStateService } from 'src/app/shared/auth/auth-state.service';
import { TokenService } from 'src/app/shared/auth/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    //user : User = new User() ;
    user:any;
    image : any ;
  constructor( private tokenStorage: TokenService ,  public router: Router ,     private auth: AuthStateService,
    ) { }

  ngOnInit() {
    this.user  =  this.tokenStorage.getUser().user ;
    this.image = "assets/img/"+this.user.photo ;
         //console.log(this.user ) ;




  }


  logout() {
    this.auth.setAuthState(false);
    this.tokenStorage.signOut();
      this.router.navigate(['/']);




  }

}
