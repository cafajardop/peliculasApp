import { Component, HostListener,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  texto: string = '';
  movies: Movie[] = [];
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

  constructor( private activatedRoute: ActivatedRoute,
                private peliculasServices: PeliculasService ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      
      this.texto = params.texto;

      // TODO: Llamar el servicio
      this.peliculasServices.buscarPeliculas(params.texto).subscribe(movies =>{
         this.movies= movies;         
      })
      
    })
  }
}
