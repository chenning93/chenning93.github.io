# Difan Zou - Academic Homepage

A modern, responsive academic homepage built with HTML, CSS, and JavaScript.

## Features

### Design & Layout
- **Modern, Clean Design**: Card-based layout with smooth transitions and animations
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Professional Color Scheme**: Academic blue palette with warm accent colors
- **Custom Typography**: Inter font for body text, Playfair Display for headings

### Pages & Sections

#### Homepage (index.html)
- Hero section with profile image and introduction
- Research interests showcase
- Latest news and updates with timeline
- Selected publications grid
- Research group snapshot
- Recruitment banner for prospective students

#### Publications Page
- **Advanced Filtering**: Filter by year, type (conference/journal/preprint)
- **Real-time Search**: Search by title, author, or keyword
- **Conference Color Coding**: Visual badges for NeurIPS, ICML, ICLR, CVPR, etc.
- **Award Highlights**: Spotlight and Best Paper badges
- **Statistics Dashboard**: Publication counts and metrics

#### Research Group Page
- PhD students with program information
- Research interns with placement destinations
- Success stories section
- Hiring banner with application instructions

#### Teaching Page
- Course cards with semester information
- Course descriptions and details
- Level indicators (undergraduate/graduate)

#### Contact Page
- Contact information with icons
- Office location and hours
- Application instructions for prospective students
- Map placeholder for location

### Interactive Features
- Smooth scrolling navigation
- Mobile-friendly hamburger menu
- Scroll-to-top button on publications page
- Animated cards on scroll
- Search and filter functionality
- Responsive design across all devices

## Project Structure

```
new-homepage/
├── index.html              # Main homepage
├── css/
│   ├── style.css          # Main stylesheet with design system
│   ├── publications.css   # Publications page specific styles
│   └── group.css          # Group page specific styles
├── js/
│   ├── main.js           # Main JavaScript functionality
│   └── publications.js    # Publications search and filter
├── pages/
│   ├── publications.html  # Publications listing
│   ├── group.html        # Research group
│   ├── teaching.html     # Teaching information
│   ├── contact.html      # Contact information
│   └── cv.html           # CV page (to be added)
├── images/
│   ├── profile.png       # Profile photo
│   └── hkulogo.png       # HKU logo
└── README.md             # This file
```

## Design System

### Color Palette
- **Primary Blue**: `#1e3a8a` (Academic/Professional)
- **Primary Light**: `#3b82f6` (Accents and highlights)
- **Accent Orange**: `#f59e0b` (Call-to-action buttons)
- **Text Primary**: `#1e293b` (Main text)
- **Text Secondary**: `#64748b` (Supporting text)
- **Background**: `#ffffff` / `#f8fafc` (Clean backgrounds)

### Conference Colors
- NeurIPS: Red `#d73e3e`
- ICML: Blue `#1e88e5`
- ICLR: Purple `#7b1fa2`
- CVPR: Green `#43a047`
- ACL/EMNLP: Teal `#00897b`
- Journals: Gold `#ffa000`

### Typography
- **Headings**: Playfair Display (serif, elegant)
- **Body Text**: Inter (sans-serif, readable)
- **Font Sizes**: Responsive scale from 0.875rem to 3.5rem

### Spacing System
- xs: 0.5rem
- sm: 1rem
- md: 1.5rem
- lg: 2rem
- xl: 3rem
- 2xl: 4rem
- 3xl: 6rem

## Setup Instructions

### 1. Basic Setup (No Server Required)
Simply open `index.html` in a web browser to view the site locally.

### 2. Local Development Server (Recommended)

Using Python:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Using Node.js:
```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server -p 8000
```

Then visit: `http://localhost:8000`

### 3. Deployment Options

#### GitHub Pages
1. Create a new repository on GitHub
2. Push the contents of `new-homepage/` to the repository
3. Go to Settings → Pages
4. Select branch and root directory
5. Your site will be live at `https://yourusername.github.io/repository-name`

#### Netlify
1. Drag and drop the `new-homepage` folder to Netlify
2. Or connect your GitHub repository
3. Automatic deployment on push

#### Traditional Web Hosting
Upload all files via FTP/SFTP to your web hosting provider.

## Customization Guide

### Updating Content

#### Personal Information
Edit `index.html`:
- Update name, title, and affiliation in the hero section
- Modify research interests in the interests grid
- Update news items in the news timeline

#### Publications
Edit `pages/publications.html`:
- Add new publications in chronological order
- Use the existing structure for consistency
- Update venue badges and award tags as needed

#### Research Group
Edit `pages/group.html`:
- Add/remove team members
- Update student information and periods
- Modify recruitment banner text

#### Styling
Edit `css/style.css`:
- Modify CSS variables at the top for global changes
- Adjust colors, fonts, spacing
- Customize component styles

### Adding New Features

#### Adding a CV Page
Create `pages/cv.html` following the existing page structure. Include:
- Timeline for education and experience
- Awards and honors section
- Service and activities
- Download CV button

#### Adding Blog/News
1. Create `pages/blog.html`
2. Add blog post cards with dates and excerpts
3. Create individual post pages in `pages/blog/`
4. Update navigation to include blog link

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations
- Minimized external dependencies (only Google Fonts and Font Awesome)
- CSS-based animations (no heavy libraries)
- Lazy loading for images (can be implemented)
- Optimized image sizes
- Clean, semantic HTML

## Accessibility Features
- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- Sufficient color contrast
- Responsive font sizing
- Alt text for images

## Future Enhancements
- [ ] Add CV download functionality
- [ ] Implement publication search with highlighting
- [ ] Add citation statistics from Google Scholar API
- [ ] Create blog/news system
- [ ] Add dark mode toggle
- [ ] Integrate with academic databases
- [ ] Add collaboration network visualization
- [ ] Implement lazy loading for images
- [ ] Add sitemap and robots.txt for SEO

## Credits
- **Design & Development**: Created for Prof. Difan Zou
- **Icons**: Font Awesome 6.4.0
- **Fonts**: Google Fonts (Inter, Playfair Display)
- **Inspired by**: Modern academic website best practices

## License
This template is created for academic use. Feel free to adapt and modify for your own academic homepage.

## Support
For questions or issues, please refer to the documentation or contact the web developer.

---

**Last Updated**: October 2025
**Version**: 1.0.0
