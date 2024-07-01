import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
  Get look and feel:
    <a target="_blank" href="https://app.oneblog.live">
      Oneblog public portal
    </a>
    
    <p>In this example you have to create two components: Authors and Author details.</p>

    <h4>Author list component</h4>
    <pre>
      Actions:
        - Add new author

      List Filters:
        - Search fulltext (server side)
        - Sort author based on SortType

        Body columns:
          - Author Name, 
          - Total publications, 
          - Total Comments
        Footer:
          - Total number of authors
          - Lazy loading "Show more" button
    </pre>
   

    <h4>Author detail component</h4>
    <pre>
      Author card (page header): 
        - Author Image (click to upload image)
        - Author Name (inplace edit)
        - Total publications, Total comments (Labels with icons)
    </pre>

    <pre>
      Section: Author publications (table view)
      
      Body columns: 
        - Article title, 
        - Article Type, 
        - Created on
      
      Footer: 
       - Total number of articles
       - Pagination: 1,2,3,4...
    </pre>
    
    <pre>
      Section: Author comments (table view)

      Body columns: 
        - Comment title, 
        - User, 
        - Created on
      
      Footer: 
       - Total number of articles
       - Pagination: 1,2,3,4...
    </pre>

    <h4>Todo:</h4>
    <pre>
      - Create BaseComponent (shared)
      - Create AuthorsComponent
      - Create AuthorComponent
      - Create mock data for model Author
      - Create mock data for model Article
      - Create mock data for model Comment
      - Create services for mock data
      - Create shared module
      - Implement bootstrap components and styles
    </pre>
  `,
})
export class App {}

bootstrapApplication(App);
