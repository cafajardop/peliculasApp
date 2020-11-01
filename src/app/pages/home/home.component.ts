import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  movies: Movie[] = []
  moviesSlidesShow: Movie[]= [];

  @HostListener('window:scroll', ['$event'])
  onScroll(){
      const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
      const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

      if(pos > max){
          // TODO: Llamar el servicio
          if(this.peliculasServices.cargando) {return;}


        this.peliculasServices.getCartelera().subscribe(movies =>{
            this.movies.push(...movies);            
        });
      }

  }

  constructor(private peliculasServices: PeliculasService) {}

  ngOnInit(): void {
    this.peliculasServices.getCartelera()
    .subscribe(movies => {
      this.movies = movies.filter(movie => movie.backdrop_path != null);
      this.moviesSlidesShow =movies.filter(movie => movie.backdrop_path != null);
    })
  }

  ngOnDestroy(){
    this.peliculasServices.resetCarteleraPage();
  }
}