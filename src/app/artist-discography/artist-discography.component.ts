import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {MusicDataService} from '../music-data.service';


@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit {

  albums: Array<any>;
  noDubs: Array<any>;
  artist: any;
  artistSub: any;
  albumSub: any;
  routeSub: any;
  constructor(private activatedRoute: ActivatedRoute, private musicService: MusicDataService) { }

  ngOnInit(): void {


    this.routeSub = this.activatedRoute.params.subscribe(params =>{
 
      this.artistSub = this.musicService.getArtistById(params['id']).subscribe(artistData =>{
        this.artist = artistData;
        
        
      })
      
      this.albumSub = this.musicService.getAlbumsByArtistId(params['id']).subscribe(albumData =>{
        
        var noDublicates = [];
        
        for(var i =0; i < albumData.items.length;i++){
          noDublicates.push(albumData.items[i].name);
          
        }
        
        this.albums = albumData.items.filter((item,index) =>{
          
         if(noDublicates.indexOf(item.name) === index){
           return item;
         }
        })
      })
    })
  }

  ngOnDestroy(): void{
    this.artistSub.unsubscribe();
    this.routeSub.unsubscribe();
    this.albumSub.unsubscribe();
  }
}

