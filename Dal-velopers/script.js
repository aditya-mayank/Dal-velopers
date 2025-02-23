document.querySelectorAll('.menu-option').forEach(option => {
    option.addEventListener('click', () => {
      const currentActive = document.querySelector('.menu-option.active');
      if (currentActive) {
        currentActive.classList.remove('active');
      }
      option.classList.add('active');
      const category = option.textContent.trim();
      if (category === 'Beverages') {
        document.getElementById('contentFrame').src = 'beverages.html';
      } else if (category === 'Coffee') {
        document.getElementById('contentFrame').src = 'coffee.html';
      } else if (category === 'Food') {
        document.getElementById('contentFrame').src = 'food.html';
      } else if (category === 'Special Combos') {
        document.getElementById('contentFrame').src = 'combos.html';
      }
    });
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelectorAll('.nav-link').forEach(l => {
        l.classList.remove('active');
      });
      link.classList.add('active');
    });
  });
  document.querySelectorAll('.circle-option').forEach(circle => {
    circle.addEventListener('click', () => {
      document.querySelectorAll('.circle-option').forEach(c => {
        c.classList.remove('active');
      });
      circle.classList.add('active');
    });
  });
  document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.querySelector('.search-bar');
  
    searchBar.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const query = searchBar.value.trim();
        if (query !== "") {
          performSearch(query);
        }
      }
    });
  
    function performSearch(query) {
      // For demonstration purposes, we'll log the query and display an alert.
      // Replace this with your actual search logic (e.g., filtering menu items or redirecting to a results page).
      console.log("Searching for:", query);
      alert("You searched for: " + query);
    }
  });
// Menu Options: Switch content based on category selection
document.querySelectorAll('.menu-option').forEach(option => {
  option.addEventListener('click', () => {
    const currentActive = document.querySelector('.menu-option.active');
    if (currentActive) {
      currentActive.classList.remove('active');
    }
    option.classList.add('active');
    const category = option.textContent.trim();
    if (category === 'Beverages') {
      document.getElementById('contentFrame').src = 'beverages.html';
    } else if (category === 'Coffee') {
      document.getElementById('contentFrame').src = 'coffee.html';
    } else if (category === 'Food') {
      document.getElementById('contentFrame').src = 'food.html';
    } else if (category === 'Special Combos') {
      document.getElementById('contentFrame').src = 'combos.html';
    }
  });
});

// Navigation Links: Update active state on click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.nav-link').forEach(l => {
      l.classList.remove('active');
    });
    link.classList.add('active');
  });
});

// Circle Options: Update active state on click
document.querySelectorAll('.circle-option').forEach(circle => {
  circle.addEventListener('click', () => {
    document.querySelectorAll('.circle-option').forEach(c => {
      c.classList.remove('active');
    });
    circle.classList.add('active');
  });
});

// Combined Search Functionality and Injection into the Content Area
document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.querySelector('.search-bar');

  searchBar.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const query = searchBar.value.trim();
      if (query !== "") {
        performSearch(query);
      }
    }
  });

  function performSearch(query) {
    // List of pages to search through
    const pages = [
      "beverages.html",
      "juices.html",
      "pizza.html",
      "food.html",
      "favourite.html",
      "Espresso.html",
      "combos.html",
      "coffee.html",
      "breakfastCombo.html"
    ];

    // Use the contentFrame as the container for search results.
    // Note: If contentFrame is an iframe, consider using a dedicated div inside it.
    const resultsContainer = document.getElementById("contentFrame");
    resultsContainer.innerHTML = `<h2>Search Results for "${query}"</h2>`;

    let resultsFound = false;

    // Fetch and search each page concurrently using Promise.all
    Promise.all(pages.map(page =>
      fetch(page)
        .then(response => response.text())
        .then(text => {
          // Check if the page's content contains the search query (case-insensitive)
          if (text.toLowerCase().includes(query.toLowerCase())) {
            resultsFound = true;
            // Create a result element with a clickable link to the page
            const resultDiv = document.createElement("div");
            resultDiv.classList.add("search-result");
            const link = document.createElement("a");
            link.href = page;
            link.textContent = `Found in ${page}`;
            resultDiv.appendChild(link);
            resultsContainer.appendChild(resultDiv);
          }
        })
        .catch(error => {
          console.error("Error fetching page " + page, error);
        })
    )).then(() => {
      if (!resultsFound) {
        resultsContainer.innerHTML += "<p>No results found</p>";
      }
    });
  }
});
