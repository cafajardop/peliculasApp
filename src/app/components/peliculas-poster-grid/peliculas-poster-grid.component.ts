import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.css']
})
export class PeliculasPosterGridComponent implements OnInit {

  @Input() movies:Movie[];

  constructor(private peliculasService: PeliculasService,
              private router: Router) { }

  ngOnInit(): void {
    this.peliculasService.getCartelera()
      .subscribe(resp =>{
          
      })
  }

  onMovieClick(movie: Movie){
      this.router.navigate(['/pelicula', movie.id]);
  }
}
