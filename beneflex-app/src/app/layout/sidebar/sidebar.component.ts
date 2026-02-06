// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-sidebar',
//   standalone: false,
//   templateUrl: './sidebar.component.html',
//   styleUrl: './sidebar.component.css'
// })
// export class SidebarComponent {
//   userRole = 'LIDER';
// }

import { Component } from '@angular/core';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  constructor(public userService: UserService) {}
}
