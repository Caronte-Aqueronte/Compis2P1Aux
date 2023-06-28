import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { EditorComponent } from '../editor/editor.component';
import { CompileService } from 'src/app/servicios/compile.service';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.css'],
})
export class EditorPageComponent implements AfterViewInit {
  public formIp: FormGroup; //formulario para la subida de archivos

  @ViewChild('consoleResult') resultConsole!: EditorComponent;

  @ViewChild('consoleCode') codeConsole!: EditorComponent;

  displayedColumns: string[] = [
    'tipo',
    'descripcion',
    'linea',
    'columna',
    'fechaHora',
  ];

  dataSource = [];

  public codigo = '';

  constructor(
    private compileService: CompileService,
    private cookieService: CookieService,
    private formBuilder: FormBuilder
  ) {
    this.formIp = this.formBuilder.group({
      ip: [
        '',
        [Validators.required, Validators.minLength(1)],
      ],
    });
  }

  /**
   * Al iniciar la vista de codigo debemos comprovar si hay un codigo guardado en las cookies
   * para iniciar con codigo precargado
   */
  ngAfterViewInit(): void {
    this.refreshPage();
  }

  private refreshPage(): void {
    //si la cookie de codigo existe entonces debemos cargar el codigo en la consola
    if (localStorage.getItem('code') != null) {
      this.codigo = localStorage.getItem('code')!;
      this.codeConsole.setCode(this.codigo);
    }

    if (localStorage.getItem('compile') != null) {
      this.setConsola();
      this.setTablaErrores();
    }

    if(localStorage.getItem('ip') != null){
      this.formIp.controls['ip'].setValue(localStorage.getItem('ip'));
    }
  }
  public setConsola(): void {
    //borramos el contenido de la consola
    let consola = '';

    let nuevaSalida = JSON.parse(localStorage.getItem('compile')!).consola;
    let errores = JSON.parse(localStorage.getItem('compile')!).errores;

    if (errores.length > 0) {
      consola = 'SE ENCONTRARON ERRORES, PARA MAS DETALLE VER LA TABLA\n';
      errores.forEach((element: any) => {
        consola +=
          '\n----ERROR----\n\nTipo de error: ' +
          element.tipo +
          '\nMotivo de error: ' +
          element.descripcion +
          '\n';
      });
    } else {
      nuevaSalida.forEach((element: any) => {
        consola += element + '\n';
      });
    }

    this.resultConsole.setCode(consola);
  }

  public sendCode(): void {
    let ip = this.formIp.controls['ip'].value;
    //Envia el codigo escrito en la consola hacia el backend
    this.compileService.sendCode(this.codigo, ip).subscribe((r) => {
      console.log(r);
      localStorage.removeItem('compile');
      localStorage.removeItem('code');
      localStorage.removeItem('ip');
      localStorage.setItem('compile', JSON.stringify(r));
      localStorage.setItem('code', this.codigo);
      localStorage.setItem('ip', ip);
      this.refreshPage(); //mandamos ha refrescar la pagina
    });
  }

  /**
   * Este metodo se activa cada vez que el usuairo hace un tecleo en la consola habiitada
   * @param codigo codigo que escribe el usuario
   */
  public setCodigo(codigo: string): void {
    //eteamos el codigo local con el escrito por el usuario
    this.codigo = codigo;
  }

  private setTablaErrores(): void {
    let errores = JSON.parse(localStorage.getItem('compile')!).errores;
    this.dataSource = errores;
  }
}
