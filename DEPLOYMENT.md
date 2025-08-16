# Deployment Guide - Google Cloud Run

This guide walks through deploying your website to Google Cloud Run.

## Prerequisites

1. **Google Cloud Account**: Set up a Google Cloud account and create a project
2. **gcloud CLI**: Install the Google Cloud SDK
   ```bash
   # macOS
   brew install google-cloud-sdk
   
   # Or download from: https://cloud.google.com/sdk/docs/install
   ```
3. **Docker**: Install Docker Desktop for local testing

## Initial Setup

1. **Authenticate with Google Cloud**:
   ```bash
   gcloud auth login
   gcloud config set project YOUR_PROJECT_ID
   ```

2. **Enable required APIs**:
   ```bash
   gcloud services enable cloudbuild.googleapis.com
   gcloud services enable run.googleapis.com
   gcloud services enable containerregistry.googleapis.com
   ```

3. **Configure Docker for Google Container Registry**:
   ```bash
   gcloud auth configure-docker
   ```

## Environment Variables

The application supports optional Supabase integration for newsletter subscriptions and image storage.

### Option 1: Deploy without Supabase (Recommended for initial deployment)
The app will work with in-memory storage for newsletter subscriptions and placeholder images.

### Option 2: Deploy with Supabase
1. Create a Supabase project at https://supabase.com
2. Update `cloudbuild.yaml` to include your Supabase credentials:
   ```yaml
   - '--set-env-vars'
   - 'NODE_ENV=production,SUPABASE_URL=your_url,SUPABASE_SERVICE_ROLE_KEY=your_key'
   ```

## Deployment Methods

### Method 1: Automated Deployment with Cloud Build (Recommended)

1. **Set up Cloud Build trigger** (one-time setup):
   ```bash
   # Connect your GitHub repository to Cloud Build
   # This can be done in the Cloud Console UI
   ```

2. **Deploy using Cloud Build**:
   ```bash
   gcloud builds submit --config cloudbuild.yaml
   ```

### Method 2: Manual Deployment

1. **Build the Docker image locally**:
   ```bash
   docker build -t gcr.io/YOUR_PROJECT_ID/website:latest .
   ```

2. **Test locally** (optional):
   ```bash
   docker run -p 3000:3000 -e NODE_ENV=production gcr.io/YOUR_PROJECT_ID/website:latest
   # Visit http://localhost:3000
   ```

3. **Push to Google Container Registry**:
   ```bash
   docker push gcr.io/YOUR_PROJECT_ID/website:latest
   ```

4. **Deploy to Cloud Run**:
   ```bash
   gcloud run deploy website \
     --image gcr.io/YOUR_PROJECT_ID/website:latest \
     --region us-central1 \
     --platform managed \
     --allow-unauthenticated \
     --port 3000 \
     --memory 512Mi \
     --cpu 1 \
     --max-instances 10 \
     --min-instances 0
   ```

## Custom Domain Setup

1. **Verify domain ownership** in Google Search Console
2. **Map custom domain** to Cloud Run service:
   ```bash
   gcloud run domain-mappings create --service website --domain yourdomain.com --region us-central1
   ```
3. **Update DNS records** with provided values

## Monitoring & Logs

View logs:
```bash
gcloud run services logs read website --region us-central1
```

View metrics in Cloud Console:
- Go to Cloud Run → Select your service → Metrics tab

## Updating the Deployment

### Using Cloud Build:
```bash
gcloud builds submit --config cloudbuild.yaml
```

### Manual update:
```bash
docker build -t gcr.io/YOUR_PROJECT_ID/website:latest .
docker push gcr.io/YOUR_PROJECT_ID/website:latest
gcloud run deploy website --image gcr.io/YOUR_PROJECT_ID/website:latest --region us-central1
```

## Cost Optimization

- **Min instances**: Set to 0 to scale to zero when not in use
- **Max instances**: Adjust based on expected traffic
- **Memory**: 512Mi is sufficient for this React application
- **CPU**: 1 CPU is adequate for most traffic levels

## Troubleshooting

### Build fails
- Check `npm ci` is working correctly
- Ensure all dependencies are in package.json

### Container fails to start
- Check logs: `gcloud run services logs read website --region us-central1`
- Verify PORT environment variable is being used
- Ensure build files are correctly copied

### Newsletter not working
- If using Supabase, verify environment variables are set correctly
- Check Supabase dashboard for connection issues
- The app will fall back to in-memory storage if Supabase is not configured

## Security Best Practices

1. **Never commit secrets** to the repository
2. **Use Secret Manager** for sensitive environment variables:
   ```bash
   echo -n "your-secret-value" | gcloud secrets create supabase-key --data-file=-
   ```
3. **Enable Cloud Armor** for DDoS protection (if needed)
4. **Set up Cloud Monitoring** alerts for unusual activity

## Support

For deployment issues:
- Check Cloud Run logs
- Review Cloud Build history
- Ensure all Google Cloud APIs are enabled

For application issues:
- Check browser console for errors
- Verify environment variables are set correctly
- Test locally with Docker first