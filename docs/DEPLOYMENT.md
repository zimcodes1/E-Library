# Vercel Deployment Guide

## Backend Deployment

### 1. Prerequisites
- Vercel account
- PostgreSQL database (Vercel Postgres, Supabase, or other)
- GitHub repository

### 2. Database Setup
Use one of these options:
- **Vercel Postgres**: Create in Vercel Dashboard
- **Supabase**: Free PostgreSQL database
- **Neon**: Serverless PostgreSQL

### 3. Deploy Backend

1. **Push to GitHub**:
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**:
   - Go to vercel.com
   - Click "Add New" → "Project"
   - Import your repository
   - Select the `backend` directory as root

3. **Configure Environment Variables**:
   Add these in Vercel Dashboard → Settings → Environment Variables:
   ```
   SECRET_KEY=<generate-secret-key>
   DEBUG=False
   ALLOWED_HOSTS=.vercel.app
   DB_ENGINE=django.db.backends.postgresql
   DB_NAME=<your-db-name>
   DB_USER=<your-db-user>
   DB_PASSWORD=<your-db-password>
   DB_HOST=<your-db-host>
   DB_PORT=5432
   ```

4. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete

5. **Run Migrations** (One-time):
   After first deployment, run migrations using Vercel CLI:
   ```bash
   vercel env pull
   python manage.py migrate
   python manage.py createsuperuser
   ```

## Frontend Deployment

### 1. Update API URL

Update `/client/src/utils/auth/config.ts`:
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://your-backend.vercel.app/api';
export default API_BASE_URL;
```

### 2. Deploy Frontend

1. **Push to GitHub** (if not already):
   ```bash
   cd client
   git init
   git add .
   git commit -m "Initial commit"
   git push
   ```

2. **Import to Vercel**:
   - Click "Add New" → "Project"
   - Import your repository
   - Select the `client` directory as root
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Add Environment Variable**:
   ```
   VITE_API_URL=https://your-backend.vercel.app/api
   ```

4. **Deploy**

## Post-Deployment

### Update CORS Settings
Update backend `core/settings.py` with your frontend URL:
```python
CORS_ALLOWED_ORIGINS = [
    "https://your-frontend.vercel.app",
]

CSRF_TRUSTED_ORIGINS = [
    "https://your-frontend.vercel.app",
]
```

### Media Files
Note: Vercel's serverless functions don't persist uploaded files. For production:
- Use AWS S3, Cloudinary, or similar for media storage
- Update Django settings to use cloud storage

## Troubleshooting

### Backend Issues
- Check Vercel logs: Dashboard → Deployments → View Function Logs
- Verify environment variables are set
- Ensure database is accessible

### Frontend Issues
- Check browser console for API errors
- Verify VITE_API_URL is correct
- Check CORS settings in backend

## Important Notes

1. **Static Files**: Handled by WhiteNoise
2. **Media Files**: Need external storage (S3, Cloudinary)
3. **Database**: Must be external (not SQLite)
4. **Migrations**: Run manually after deployment
5. **Environment Variables**: Set in Vercel Dashboard

## Useful Commands

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from CLI
vercel --prod

# View logs
vercel logs <deployment-url>
```
