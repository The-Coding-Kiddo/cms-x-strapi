# Strapi v5 API Structure - Articles Endpoint

## Base URL
```
http://localhost:1337/api
```

## Endpoints

### Get All Articles
```
GET /api/articles
```

### Get Single Article by ID
```
GET /api/articles/{id}
```

### Get Single Article by Slug
```
GET /api/articles?filters[slug][$eq]=your-article-slug
```

---

## Query Parameters

### Populate Relations & Media
```
?populate[cover][fields][0]=url
&populate[cover][fields][1]=alternativeText
&populate[cover][fields][2]=width
&populate[cover][fields][3]=height
&populate[cover][fields][4]=formats
&populate[author][fields][0]=name
&populate[author][fields][1]=email
&populate[author][populate][avatar][fields][0]=url
&populate[author][populate][avatar][fields][1]=alternativeText
&populate[category][fields][0]=name
&populate[category][fields][1]=slug
&populate[blocks][populate][media][fields][0]=url
&populate[blocks][populate][media][fields][1]=alternativeText
&populate[blocks][populate][files][fields][0]=url
&populate[blocks][populate][files][fields][1]=name
```

### Pagination
```
?pagination[page]=1
&pagination[pageSize]=10
```

### Sorting
```
?sort[0]=createdAt:desc
```
or
```
?sort[0]=publishedAt:desc
```

### Filtering by Category
```
?filters[category][slug][$eq]=technology
```

### Filtering by Author
```
?filters[author][name][$eq]=John Doe
```

### Only Published Articles
```
?publicationState=live
```

---

## Simple Postman Requests

### Get all articles (simple):
```
GET http://localhost:1337/api/articles?populate=*
```

### Get single article by ID:
```
GET http://localhost:1337/api/articles/1?populate=*
```

### Get single article by slug:
```
GET http://localhost:1337/api/articles?filters[slug][$eq]=my-first-article&populate=*
```

### Get articles by category:
```
GET http://localhost:1337/api/articles?filters[category][slug][$eq]=technology&populate=*
```

### Get articles with pagination:
```
GET http://localhost:1337/api/articles?populate=*&pagination[page]=1&pagination[pageSize]=10
```

### Get articles sorted by date:
```
GET http://localhost:1337/api/articles?populate=*&sort[0]=createdAt:desc
```

---

## Response Structure

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "abc123",
      "title": "Article Title",
      "description": "Short description",
      "slug": "article-title",
      "createdAt": "2025-12-16T10:00:00.000Z",
      "updatedAt": "2025-12-16T10:00:00.000Z",
      "publishedAt": "2025-12-16T10:00:00.000Z",
      "cover": {
        "id": 1,
        "url": "/uploads/image.jpg",
        "alternativeText": "Cover image",
        "width": 1920,
        "height": 1080,
        "formats": {
          "thumbnail": { "url": "/uploads/thumbnail_image.jpg" },
          "medium": { "url": "/uploads/medium_image.jpg" },
          "large": { "url": "/uploads/large_image.jpg" }
        }
      },
      "author": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "avatar": {
          "url": "/uploads/avatar.jpg",
          "alternativeText": "John's avatar"
        }
      },
      "category": {
        "id": 1,
        "name": "Technology",
        "slug": "technology"
      },
      "blocks": [
        {
          "id": 1,
          "__component": "shared.rich-text",
          "body": "<p>Rich text content here</p>"
        },
        {
          "id": 2,
          "__component": "shared.media",
          "file": {
            "url": "/uploads/media.jpg",
            "alternativeText": "Media description"
          }
        },
        {
          "id": 3,
          "__component": "shared.quote",
          "title": "Author Name",
          "body": "Quote text here"
        },
        {
          "id": 4,
          "__component": "shared.slider",
          "files": [
            { "url": "/uploads/slide1.jpg" },
            { "url": "/uploads/slide2.jpg" }
          ]
        }
      ]
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "pageCount": 5,
      "total": 47
    }
  }
}
```

---

## Headers Required

```
Content-Type: application/json
Authorization: Bearer YOUR_API_TOKEN
```

*(Authorization header only required if you've enabled authentication for the Article endpoint)*

---

## Important Notes

1. **Media URLs**: All media URLs start with `/uploads/`. You need to prepend your Strapi base URL:
   ```
   Full URL = http://localhost:1337 + /uploads/image.jpg
   ```

2. **Permissions**: Make sure to enable these in Strapi Admin:
   - Go to: Settings → Users & Permissions → Roles → Public
   - Enable for **Article**: `find`, `findOne`
   - Enable for **Author**: `find`
   - Enable for **Category**: `find`
   - Enable for **Upload**: `find` (for media files)

3. **API Token**: 
   - If authentication is required, generate token at: Settings → API Tokens
   - Create a new token with `Read-only` access
   - Use it in Authorization header: `Bearer YOUR_TOKEN`

4. **Publication State**: 
   - Use `publicationState=live` to only fetch published articles
   - Omit this parameter or use `publicationState=preview` to see drafts (requires authentication)

5. **Dynamic Zones**: The `blocks` field contains dynamic content with different component types:
   - `shared.rich-text` - Rich text editor content
   - `shared.media` - Single media file
   - `shared.quote` - Quote block with title and body
   - `shared.slider` - Multiple media files for image sliders

---

## Quick Reference - Article Schema

The Article content type has these fields:

- `title` (string) - Article title
- `description` (text) - Short description (max 80 chars)
- `slug` (uid) - URL-friendly identifier (auto-generated from title)
- `cover` (media) - Cover image
- `author` (relation) - Many-to-one relation with Author
- `category` (relation) - Many-to-one relation with Category
- `blocks` (dynamiczone) - Dynamic content blocks (rich-text, media, quote, slider)
- `createdAt` (datetime) - Auto-generated creation date
- `updatedAt` (datetime) - Auto-generated update date
- `publishedAt` (datetime) - Publication date (null if draft)
