# Neon PostgreSQL Setup Guide

## Step 1: Create Neon Account & Database

1. Go to [neon.tech](https://neon.tech) and sign up (free tier available)
2. Click "Create Project"
3. Choose a project name (e.g., "libronet")
4. Select a region closest to your users
5. Click "Create Project"

## Step 2: Get Connection String

1. In your Neon dashboard, go to your project
2. Click on "Connection Details"
3. Copy the **Connection String** (it looks like):
   ```
   postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require
   ```

## Step 3: Configure Local Environment

1. Create/update `.env` file in backend directory:
   ```bash
   cd backend
   nano .env
   ```

2. Add your Neon connection string:
   ```env
   SECRET_KEY=your-django-secret-key
   DEBUG=True
   ALLOWED_HOSTS=localhost,127.0.0.1
   DATABASE_URL=postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require
   ```

3. Generate a Django secret key:
   ```bash
   python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
   ```

## Step 4: Test Local Connection

```bash
# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run server
python manage.py runserver
```

## Step 5: Deploy to Vercel

### Backend Deployment

1. **Add Environment Variable in Vercel**:
   - Go to Vercel Dashboard
   - Select your backend project
   - Go to Settings → Environment Variables
   - Add:
     - `DATABASE_URL`: Your Neon connection string
     - `SECRET_KEY`: Your Django secret key
     - `DEBUG`: `False`
     - `ALLOWED_HOSTS`: `.vercel.app`

2. **Deploy**:
   ```bash
   vercel --prod
   ```

3. **Run Migrations** (after first deployment):
   ```bash
   # Install Vercel CLI if not installed
   npm i -g vercel

   # Pull environment variables
   vercel env pull

   # Run migrations
   python manage.py migrate

   # Create superuser
   python manage.py createsuperuser
   ```

### Frontend Deployment

1. **Add Environment Variable**:
   - `VITE_API_URL`: `https://your-backend.vercel.app/api`

2. **Deploy**:
   ```bash
   cd client
   vercel --prod
   ```

## Neon Features

### Free Tier Includes:
- 512 MB storage
- 1 project
- Unlimited databases per project
- Autoscaling compute
- Point-in-time restore (7 days)

### Connection Pooling (Optional)
For better performance, use Neon's connection pooler:
```
postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require&options=endpoint%3Dpooled
```

### Branching (Optional)
Neon supports database branching for development:
1. Create a branch in Neon dashboard
2. Use branch connection string for development
3. Merge changes when ready

## Troubleshooting

### Connection Issues
- Ensure `sslmode=require` is in connection string
- Check if your IP is allowed (Neon allows all by default)
- Verify connection string is correct

### Migration Issues
```bash
# Reset migrations (if needed)
python manage.py migrate --fake-initial

# Or force migrations
python manage.py migrate --run-syncdb
```

### Performance
- Enable connection pooling in DATABASE_URL
- Use `conn_max_age=600` for persistent connections (already configured)

## Monitoring

1. **Neon Dashboard**:
   - View query performance
   - Monitor storage usage
   - Check connection count

2. **Django Logs**:
   ```bash
   vercel logs <deployment-url>
   ```

## Backup & Restore

### Backup
```bash
# Using Neon's built-in backups (automatic)
# Or manual backup:
pg_dump $DATABASE_URL > backup.sql
```

### Restore
```bash
psql $DATABASE_URL < backup.sql
```

## Security Best Practices

1. **Never commit** `.env` file
2. **Rotate credentials** periodically
3. **Use environment variables** in Vercel
4. **Enable SSL** (already required by Neon)
5. **Monitor access logs** in Neon dashboard

## Useful Commands

```bash
# Test connection
psql $DATABASE_URL

# Run SQL query
psql $DATABASE_URL -c "SELECT version();"

# List tables
psql $DATABASE_URL -c "\dt"

# Check database size
psql $DATABASE_URL -c "SELECT pg_size_pretty(pg_database_size('dbname'));"
```

## Next Steps

1. ✅ Set up Neon database
2. ✅ Configure local environment
3. ✅ Test migrations locally
4. ✅ Deploy to Vercel
5. ✅ Run production migrations
6. ✅ Create production superuser
7. ✅ Test API endpoints
8. ✅ Deploy frontend with correct API URL

## Support

- Neon Docs: https://neon.tech/docs
- Neon Discord: https://discord.gg/neon
- Django Docs: https://docs.djangoproject.com
