document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('stars');
  
    // Generar estrellas iniciales
    generateAndSetStars();
  
    // Listener para eventos de clic en el textarea
    textarea.addEventListener('click', function(event) {
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const cols = textarea.cols;
      const rows = textarea.rows;
      const colIndex = Math.floor(x / (rect.width / cols));
      const rowIndex = Math.floor(y / (rect.height / rows));
      const starsToAdd = getRandomStar();
      const starsArray = textarea.value.split('\n');
  
      if (rowIndex < starsArray.length) {
        const line = starsArray[rowIndex];
        if (colIndex < line.length) {
          starsArray[rowIndex] = line.substring(0, colIndex) + starsToAdd + line.substring(colIndex + 1);
          textarea.value = starsArray.join('\n');
        }
      }
    });
  
    // Función para generar y establecer estrellas
    function generateAndSetStars() {
      const rows = textarea.rows;
      const cols = textarea.cols;
      textarea.value = generateStars(rows, cols);
    }
  
    // Función para generar estrellas
    function generateStars(rows, cols) {
      let stars = '';
      for (let i = 0; i < rows; i++) {
        let row = '';
        for (let j = 0; j < cols; j++) {
          if (Math.random() < 0.2) {
            row += getRandomStar();
            const randomSpaces = Math.floor(Math.random() * 3); // Generar número aleatorio de espacios (0-2)
            for (let s = 0; s < randomSpaces; s++) {
              row += ' '; // Añadir número aleatorio de espacios
            }
          } else {
            row += '   '; // Añadir 3 espacios para posiciones sin estrella
          }
        }
        stars += row + '\n'; // Nueva línea después de cada fila
      }
      return stars;
    }
  
    // Función para obtener un carácter de estrella aleatorio
    function getRandomStar() {
      const stars = ['.', '*', '+']; // Puedes añadir más caracteres de estrella si lo necesitas
      return stars[Math.floor(Math.random() * stars.length)];
    }
  
    // Listener para cambios de tamaño del textarea
    textarea.addEventListener('input', generateAndSetStars);
    window.addEventListener('resize', generateAndSetStars);
  });