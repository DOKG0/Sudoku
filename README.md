# Sudoku - Aplicación Web

Este es un juego de Sudoku interactivo hecho con **HTML**, **CSS** y **JavaScript**. La aplicación permite a los usuarios jugar al Sudoku con diferentes niveles de dificultad, realizar comprobaciones sobre su solución y guardar sus puntajes.

## Características

- **Interfaz limpia y fácil de usar**: La aplicación cuenta con una pantalla de bienvenida, selección de dificultad y una pantalla de juego intuitiva.
- **Selección de dificultad**: Los usuarios pueden elegir entre tres niveles de dificultad:
  - **Principiante**
  - **Normal**
  - **Difícil**
- **Controles de juego**:
  - Los jugadores pueden seleccionar números del 1 al 9 y borrar sus selecciones.
  - También pueden recibir pistas y verificar si su solución es correcta.
  - Opción para comenzar un nuevo juego o cambiar la dificultad.
- **Puntajes**: La aplicación mantiene un historial de puntajes y permite limpiar los puntajes guardados.
- **Temporizador**: El tiempo transcurre mientras el jugador juega, con un contador visible en la interfaz.
  
## Estructura del Proyecto

El proyecto se compone de los siguientes archivos:

1. **index.html**: Contiene la estructura principal de la aplicación.
2. **css/base.css**: Estilos base comunes para la aplicación.
3. **css/home.css**: Estilos específicos para la pantalla de bienvenida.
4. **css/sudoku.css**: Estilos para la tabla de Sudoku y la pantalla del juego.
5. **css/score.css**: Estilos para la tabla de puntajes.
6. **js/script.js**: Lógica de JavaScript que maneja el funcionamiento del juego, selección de números, temporizador y puntajes.

## Instalación

1. **Clonar el repositorio**:
    ```bash
    git clone https://github.com/DOKG0/Sudoku.git
    ```

2. **Abrir el archivo `index.html`**:
    - Abre el archivo `index.html` en tu navegador para comenzar a jugar.

## Uso

1. **Pantalla de bienvenida**:
   - Ingresa un nombre de usuario en el campo de texto.
   - Selecciona la dificultad (Principiante, Normal, Difícil).
   - Haz clic en el botón **Comenzar Juego**.

2. **Pantalla de juego**:
   - En la pantalla de juego, verás un tablero de Sudoku generado con celdas vacías y algunas celdas con números predefinidos.
   - Usa los botones de números (1-9) para llenar el tablero. Si cometes un error, puedes presionar el botón **Borrar** para eliminar la selección actual.
   - Usa el botón **Ayuda** para obtener una pista y **Verificar** para comprobar si la solución es correcta.
   - Puedes **Cambiar Dificultad** o **Iniciar un Nuevo Juego** en cualquier momento.

3. **Tabla de Puntajes**:
   - Después de completar el juego, puedes ver tu puntaje en la **Tabla de Puntajes**.
   - Si deseas, puedes limpiar los puntajes almacenados presionando el botón **Limpiar Puntajes**.
