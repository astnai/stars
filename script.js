document.addEventListener('DOMContentLoaded', function() {
  // Get the textarea element
  const textarea = document.getElementById('stars');
  
  // Generate initial stars with reduced spacing
  const initialStars = generateStars(40, 150, 5);
  textarea.value = initialStars;
  
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
    const starsToAdd = generateStars(1, 1, 0);
    const starsArray = textarea.value.split('\n');
  
    // Update textarea value with new star at clicked position
    starsArray[rowIndex] = starsArray[rowIndex].substring(0, colIndex) + starsToAdd + starsArray[rowIndex].substring(colIndex + 1);
    textarea.value = starsArray.join('\n');
  });
  
  // Function to generate stars
  function generateStars(rows, cols, spacing) {
    let stars = '';
    for (let i = 0; i < rows; i++) {
      let lastCharWasSpace = true; // Initialize to true to allow stars at the beginning of the row
      for (let j = 0; j < cols; j++) {
        // Adjust this probability to control star density (increase it for more stars)
        if (Math.random() < 0.4 && lastCharWasSpace) {
          stars += getRandomStar();
          lastCharWasSpace = false;
        } else {
          stars += ' ';
          lastCharWasSpace = true;
        }
        for (let s = 0; s < spacing; s++) {
          stars += ' '; // Add spaces for reduced spacing between stars
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