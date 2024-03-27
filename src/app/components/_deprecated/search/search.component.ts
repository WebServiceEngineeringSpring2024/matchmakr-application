import { Component } from '@angular/core';
import { PartyComponent } from '../party/party.component';
import { FriendslistComponent } from '../friendslist/friendslist.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FriendslistComponent, PartyComponent, SidebarComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

}
