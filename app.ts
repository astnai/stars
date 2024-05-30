document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.getElementById('stars') as HTMLTextAreaElement;
  
  generateAndSetStars();

  textarea.addEventListener('click', (event: MouseEvent) => {
    const rect = textarea.getBoundingClientRect();
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

  textarea.addEventListener('input', generateAndSetStars);
  window.addEventListener('resize', generateAndSetStars);

  function generateAndSetStars(): void {
    const rows = textarea.rows;
    const cols = textarea.cols;
    textarea.value = generateStars(rows, cols);
  }

  function generateStars(rows: number, cols: number): string {
    let stars = '';
    for (let i = 0; i < rows; i++) {
      let row = '';
      for (let j = 0; j < cols; j++) {
        if (Math.random() < 0.2) {
          row += getRandomStar();
          const randomSpaces = Math.floor(Math.random() * 3);
          for (let s = 0; s < randomSpaces; s++) {
            row += ' ';
          }
        } else {
          row += '   ';
        }
      }
      stars += row + '\n';
    }
    return stars;
  }

  function getRandomStar(): string {
    const stars = ['.', '*', '+'];
    return stars[Math.floor(Math.random() * stars.length)];
  }

  function changeStarColor(): void {
    const starElements = document.querySelectorAll('.star');
    starElements.forEach(star => {
      (star as HTMLElement).style.color = getRandomColor();
    });
  }

  function getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const colorButton = document.createElement('button');
  colorButton.textContent = 'Change Star Colors';
  colorButton.addEventListener('click', changeStarColor);
  document.body.appendChild(colorButton);
});