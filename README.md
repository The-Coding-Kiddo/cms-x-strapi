# 🚀 InnovateX CMS - Blog Engine

A powerful headless CMS built with Strapi v5, branded and customized for InnovateX. Perfect for managing blog content with a modern admin interface, RESTful API, and flexible content architecture.

## Features

- 📝 **Blog Management** - Create, edit, and publish articles
- 👥 **Author Management** - Manage multiple authors and contributors
- 🏷️ **Categories** - Organize content with tagging system
- 🖼️ **Media Management** - Upload and manage images and files
- 🎨 **InnovateX Theme** - Custom green & teal color scheme with smokey white backgrounds
- 🔐 **Role-based Access** - Admin permissions and user management
- ⚡ **Real-time API** - RESTful API for frontend consumption
- 💾 **Database** - SQLite (local), PostgreSQL (production/cloud)

## Quick Start

### Prerequisites
- Node.js (v18.0.0 - v22.x.x)
- npm (v6.0.0+)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run develop
```

The admin panel will be available at `http://localhost:1337/admin`

## Available Commands

### Development
```bash
npm run develop
```
Runs the CMS with hot-reload enabled. Perfect for development work.

### Production
```bash
npm run start
```
Runs the CMS in production mode without auto-reload.

### Build
```bash
npm run build
```
Compiles the admin panel for production deployment.

### Seed Data (Optional)
```bash
npm run seed:example
```
Loads example data into the database.

## Project Structure

```
src/
├── admin/           # Admin panel customization
├── api/             # Content types (Article, Author, Category, etc.)
├── components/      # Reusable content components
└── bootstrap.js     # App initialization

config/
├── database.js      # Database configuration
├── server.js        # Server settings
└── admin.js         # Admin panel settings

public/
└── uploads/         # Media files storage

data/
└── data.json        # Seed data
```

## Content Types

### Article
- Title, Description, Slug
- Cover Image
- Author (relation)
- Category (relation)
- Dynamic Blocks (rich text, media, quotes, sliders)

### Author
- Name, Email
- Avatar
- Articles (one-to-many)

### Category
- Name, Slug
- Articles (one-to-many)

## Database

**Local Development:** SQLite (`.tmp/data.db`)
**Production/Cloud:** PostgreSQL

To switch to PostgreSQL locally:
```bash
# Install PostgreSQL driver
npm install pg

# Update .env
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=yourpassword
```

## API Endpoints

### Get All Articles
```
GET /api/articles?populate=*
```

### Get Article by ID
```
GET /api/articles/1?populate=*
```

### Get Article by Slug
```
GET /api/articles?filters[slug][$eq]=article-slug&populate=*
```

See `API_STRUCTURE.md` for complete endpoint documentation.

## Deployment

### Deploy to Strapi Cloud
```bash
npm run deploy
```

This automatically:
- Provisions a PostgreSQL database
- Sets up hosting
- Configures environment variables
- Deploys your CMS

### Self-Hosted Deployment
Deploy the built files to any Node.js hosting:
```bash
npm run build
# Deploy the 'build' folder to your server
npm run start
```

## Media Storage

- **Local:** Files stored in `public/uploads/`
- **Cloud:** Automatically managed by Strapi Cloud

## Support & Development

For development questions, check the Strapi documentation or review the project's API structure in `API_STRUCTURE.md`.

---

**Version:** 1.0.0  
