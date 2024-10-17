// DOM Elements for Search Functionality
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const recipeContainer = document.getElementById('recipe-container');

// Event Listener for Search Button
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        fetchRecipes(query);
    }
});

// Function to Fetch Recipes
async function fetchRecipes(dishName) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${dishName}`);
        const data = await response.json();

        if (data.meals) {
            displayRecipe(data.meals);
        } else {
            recipeContainer.innerHTML = '<p>No recipes found.</p>';
        }
    } catch (error) {
        recipeContainer.innerHTML = '<p>Error fetching recipes.</p>';
    }
}

// Function to Display Recipe Details
function displayRecipe(meals) {
    recipeContainer.innerHTML = ''; // Clear previous results
    meals.forEach(meal => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.innerHTML = `
            <h3>${meal.strMeal}</h3>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <p>${meal.strInstructions}</p>
            <a href="${meal.strSource}" target="_blank">View Recipe</a>
        `;
        recipeContainer.appendChild(recipeCard);
    });
}

// Image Carousel Functionality
let currentIndex = 0;
const carouselImages = document.querySelectorAll('.carousel-image');
const totalImages = carouselImages.length;

// Function to show the next image
function showNextImage() {
    carouselImages[currentIndex].classList.remove('visible');
    currentIndex = (currentIndex + 1) % totalImages; 
    carouselImages[currentIndex].classList.add('visible');
}

// Start the carousel
setInterval(showNextImage, 3000); // Change image every 3 seconds

// Suggestion form submission (for suggestions.html)
const suggestionForm = document.getElementById('suggestion-form');
if (suggestionForm) {
    suggestionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const suggestion = document.getElementById('suggestion').value;

        console.log(`Email: ${email}, Suggestion: ${suggestion}`);
        alert("Thank you for your suggestion!");
        suggestionForm.reset();
    });
}
