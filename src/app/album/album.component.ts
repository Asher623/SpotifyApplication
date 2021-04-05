import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router'
import {MusicDataService} from '../music-data.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  album: any;
  constructor(private snackBar : MatSnackBar, private activatedRoute: ActivatedRoute, private musicService: MusicDataService) { }
  albumSub: any;
  routeSub: any;

  ngOnInit(): void {

    this.routeSub = this.activatedRoute.params.subscribe(params =>{
      this.albumSub = this.musicService.getAlbumById(params['id']).subscribe(albumData =>{
        this.album = albumData;
      })
    })
  }

  ngOnDestroy(): void{
    
    this.routeSub.unsubscribe();
    this.albumSub.unsubscribe();
  }

  addToFavourites(trackID: any): void{
    this.albumSub = this.musicService.addToFavourites(trackID).subscribe(albumData =>{
      if (albumData){
        this.snackBar.open("Adding to Favourites...", "Done", { duration: 1500 });
      }
      else{
        this.snackBar.open("Unable to add song to Favourites", "Error", { duration: 1500 });
      }
    })
  }


  

}
