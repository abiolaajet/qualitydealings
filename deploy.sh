#!/bin/bash

# Google Cloud Run Deployment Script (Bash/Unix)

PROJECT_NAME="qualitydealings"
REGION="us-central1"

# Check if logged in
echo "Checking Google Cloud authentication..."
if ! gcloud auth print-access-token > /dev/null 2>&1; then
    echo "Error: Not authenticated with gcloud. Please run 'gcloud auth login' first."
    exit 1
fi

# Get current project ID
PROJECT_ID=$(gcloud config get-value project)
if [ -z "$PROJECT_ID" ] || [ "$PROJECT_ID" == "(unset)" ]; then
    PROJECT_ID="quality-dealings-ecommerce"
    echo "Project ID not set, defaulting to: $PROJECT_ID"
    gcloud config set project "$PROJECT_ID"
fi

echo "Using Project ID: $PROJECT_ID"

# Enable required services
echo "Enabling necessary Google Cloud services..."
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com

IMAGE_PATH="$REGION-docker.pkg.dev/$PROJECT_ID/cloud-run-source-deploy/$PROJECT_NAME"

# Build and Push using Cloud Build
echo "Building image using Google Cloud Build..."
gcloud builds submit --tag "$IMAGE_PATH"

# Get Environment Variables (using discovered/fallback values)
MONGO_URI=${MONGODB_URI}
JWT_SECRET=${JWT_SECRET}
STRIPE_KEY=${STRIPE_SECRET_KEY}

# Deploy to Cloud Run
echo "Deploying to Google Cloud Run..."
gcloud run deploy "$PROJECT_NAME" \
    --image "$IMAGE_PATH" \
    --platform managed \
    --region "$REGION" \
    --allow-unauthenticated \
    --update-env-vars "NODE_ENV=production,MONGODB_URI='$MONGO_URI',JWT_SECRET='$JWT_SECRET',STRIPE_SECRET_KEY='$STRIPE_KEY'"

if [ $? -eq 0 ]; then
    SERVICE_URL=$(gcloud run services describe "$PROJECT_NAME" --platform managed --region "$REGION" --format='value(status.url)')
    echo -e "\n🚀 Deployment successful!"
    echo "Your app is live at: $SERVICE_URL"
else
    echo "Deployment failed. Please check the error above."
fi
