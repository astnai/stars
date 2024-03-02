document.addEventListener('DOMContentLoaded', function() {
  // Get the textarea element
  const textarea = document.getElementById('stars');
  
  // Generate initial stars with reduced spacing
  generateAndSetStars(textarea);

  // Add event listener for click events on textarea
  textarea.addEventListener('click', function(event) {
    // Calculate click position relative to textarea
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const cols = textarea.cols;
    const rows = textarea.rows;
    const colIndex = Math.floor(x / (rect.width / cols));
    const rowIndex = Math.floor(y / (rect.height / rows));
    const starsToAdd = getRandomStar();
    const starsArray = textarea.value.split('\n');
  
    // Update textarea value with new star at clicked position
    starsArray[rowIndex] = starsArray[rowIndex].substring(0, colIndex) + starsToAdd + starsArray[rowIndex].substring(colIndex + 1);
    textarea.value = starsArray.join('\n');
  });

  // Update stars
  setInterval(function() {
    generateAndSetStars(textarea);
  }, 10000);

  // Function to generate and set stars
  function generateAndSetStars(textarea) {
    const stars = generateStars(textarea.rows, textarea.cols);
    textarea.value = stars;
  }

  // Function to generate stars
  function generateStars(rows, cols) {
    let stars = '';
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (Math.random() < 0.2) {
          stars += getRandomStar();
          const randomSpaces = Math.floor(Math.random() * 3); // Generate random number of spaces (0-2)
          for (let s = 0; s < randomSpaces; s++) {
            stars += ' '; // Add random number of spaces
          }
        } else {
          stars += '   '; // Add 3 spaces for non-star positions
        }
      }
      stars += '\n'; // Newline after each row
    }
    return stars;
  }
  
  // Function to get a random star character
  function getRandomStar() {
    const stars = ['.', '*', '+']; // You can add more star characters here if needed
    return stars[Math.floor(Math.random() * stars.length)];
  }
});
