import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import {MusicDataService} from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  constructor( private activeRoute: ActivatedRoute, private musicService: MusicDataService) { }

  results: any;
  searchQuery: any;
  subRoute: any;
  resultSub: any;

  ngOnInit(): void {
    this.subRoute = this.activeRoute.queryParams.subscribe(params =>{
      this.searchQuery = params['q'];
      this.resultSub = this.musicService.searchArtists(params["q"]).subscribe(data =>{
        this.results = data.artists.items.filter(item => {
          if (item.images.length > 0){
            return item;
          }
        })
      })
    })
  }
  ngOnDestroy(): void{
    this.resultSub.unsubscribe();
    this.subRoute.unsubscribe();
    
  }

}
