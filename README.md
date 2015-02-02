## Website Performance Optimization portfolio project

### Getting started
Some useful tips to help you get started:

1. Check out the repository
1. To inspect the site on your phone, you can run a local server

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```

1. Open a browser and visit localhost:8080
1. Download and install [ngrok](https://ngrok.com/) to make your local server accessible remotely.

  ``` bash
  $> cd /path/to/your-project-folder
  $> ngrok 8080
  ```

1. Copy the public URL ngrok gives you and try running it through PageSpeed Insights!

#### Part 1: Optimize PageSpeed Insights score for index.html

##### Criteria:
- PageSpeed score >= 90

##### Solution:
1. index.html
    - move necessary CSS from external link to index.html directly
    - reorder CSS, and JS to optimize rendering path




#### Part 2: Optimize Frames per Second in pizza.html

##### Criteria:
- 60 fps
- resize < 1ms

##### Solution:
1. views/js/main.js was edited to improve performance
    - moving DOM queries out of loops
    - using classes instead of inline styles
    - animate with 2D ```translate``` instead of ```top``` and ```left``` 
2. pizza.html was also modified
    -  include new CSS styles to ease use of inline styles 
