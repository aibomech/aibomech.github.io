# AIBOMECH Admin Panel - User Guide

## Overview

The AIBOMECH Admin Panel provides a user-friendly interface to manage website content without directly editing HTML, CSS, or JavaScript files. You can easily add, edit, and remove blog posts, projects, and publications through a clean web-based interface.

## Features

- **Password Protected Access**: Secure login system to prevent unauthorized access
- **Content Management**: Add, view, and remove blogs, projects, and publications
- **Live Preview**: Preview your website changes before publishing
- **Form Validation**: Ensures all required fields are completed
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode Support**: Matches the main website's dark mode functionality

## Getting Started

### 1. Access the Admin Panel

1. Navigate to `[your-domain]/admin.html`
2. Enter the admin password: `aibomech2025` (change this in `js/admin.js` for security)
3. Click "Login" to access the panel

### 2. Managing Content

#### Blog Posts
- **Add New Blog**: Fill in the title, description, link path, and link text
- **View Existing**: See all current blog posts with preview text
- **Remove**: Click the "Remove" button to delete a blog post

#### Projects  
- **Add New Project**: Enter project details including title, description, and links
- **View Existing**: Browse all current projects
- **Remove**: Delete projects using the remove button

#### Publications
- **Add New Publication**: Include title, journal, description, image path, DOI link, and BibTeX citation
- **View Existing**: See all publications with metadata
- **Remove**: Remove publications as needed

### 3. Content Summary & Updates

The "Preview & Update" tab shows:
- Total count of each content type
- Summary statistics
- Update and preview buttons

## File Structure

```
├── admin.html              # Admin panel interface
├── js/
│   ├── admin.js            # Admin panel functionality
│   └── content-loader.js   # Dynamic content loading for main site
├── data/
│   └── content.json        # Content data storage
└── index.html             # Main website (modified to load dynamic content)
```

## Technical Implementation

### Content Storage
Content is stored in `data/content.json` with the following structure:

```json
{
  "blogs": [
    {
      "id": "blog1",
      "title": "Blog Title",
      "description": "Blog description...",
      "link": "blogs/blog1.html",
      "linkText": "Read More"
    }
  ],
  "projects": [...],
  "publications": [...]
}
```

### Dynamic Loading
The main website (`index.html`) uses `content-loader.js` to:
1. Fetch content from `data/content.json`
2. Dynamically populate sections
3. Maintain existing styling and functionality

### Browser Compatibility
- Modern browsers with JavaScript enabled
- localStorage support for admin session management
- Fetch API support for content loading

## Security Considerations

### For Production Use:
1. **Change the default password** in `js/admin.js`
2. **Implement server-side authentication** for enhanced security
3. **Use HTTPS** for secure data transmission
4. **Set up proper file permissions** on the server
5. **Consider implementing user roles** for multiple administrators

### Current Limitations:
- Client-side only (no server-side validation)
- Content changes require manual file updates for persistence
- Basic password protection (not encrypted)

## Deployment Notes

### Static Hosting (GitHub Pages, Netlify, etc.)
1. The admin panel works entirely client-side
2. Content updates generate downloadable files
3. Manual upload of updated `content.json` required

### Server-Based Hosting
1. Can implement server-side saving functionality
2. Real-time content updates possible
3. Enhanced security options available

## Troubleshooting

### Common Issues:

**Admin panel won't load**
- Ensure all JavaScript files are properly linked
- Check browser console for errors
- Verify file paths are correct

**Content not updating on main site**
- Refresh the page after making changes
- Check that `content-loader.js` is included in `index.html`
- Verify `data/content.json` is accessible

**Login not working**
- Verify the password in `js/admin.js`
- Check browser console for JavaScript errors
- Ensure cookies/localStorage is enabled

## Customization

### Styling
- Admin panel uses the same CSS variables as main site
- Modify styles in the `<style>` section of `admin.html`
- Maintains design consistency with main website

### Functionality
- Add new content types by extending the JSON structure
- Modify form fields in `admin.html`
- Update corresponding JavaScript functions in `admin.js`

### Password Management
Change the admin password by modifying this line in `js/admin.js`:
```javascript
const ADMIN_PASSWORD = 'your-new-password';
```

## Future Enhancements

Potential improvements for production use:
- Server-side backend integration
- User management system
- Content versioning
- Image upload functionality
- Rich text editor for descriptions
- Bulk content import/export
- Content scheduling
- SEO metadata management

## Support

For technical support or questions about the admin panel:
- Review this documentation
- Check the browser console for error messages
- Ensure all files are properly uploaded to your server
- Verify JavaScript is enabled in the browser

---

**Note**: This admin panel is designed to work with the existing AIBOMECH website structure while maintaining the original design and functionality. All content management happens through a clean, intuitive interface without requiring direct code editing.