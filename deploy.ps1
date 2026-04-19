# Google Cloud Run Deployment Script (PowerShell)
# This script builds the Docker image using Cloud Build and deploys it to Cloud Run.

$projectName = "qualitydealings"
$region = "us-central1"

# Check if logged in
Write-Host "Checking Google Cloud authentication..." -ForegroundColor Cyan
& gcloud.cmd auth print-access-token > $null 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Not authenticated with gcloud. Please run 'gcloud auth login' first." -ForegroundColor Red
    exit
}

# Get current project ID
$projectId = & gcloud.cmd config get-value project
if ([string]::IsNullOrEmpty($projectId) -or $projectId -eq "(unset)" -or $projectId -ne "qualitydealings-uk") {
    $projectId = "qualitydealings-uk"
    Write-Host "Setting project ID to: $projectId" -ForegroundColor Yellow
    & gcloud.cmd config set project $projectId
}

Write-Host "Using Project ID: $projectId" -ForegroundColor Green

# Enable required services
Write-Host "Enabling necessary Google Cloud services..." -ForegroundColor Cyan
& gcloud.cmd services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com

# Create Artifact Registry repository if it doesn't exist
$repoName = "cloud-run-source-deploy"
& gcloud.cmd artifacts repositories describe $repoName --location=$region > $null 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Creating Artifact Registry repository..." -ForegroundColor Cyan
    & gcloud.cmd artifacts repositories create $repoName --repository-format=docker --location=$region
}

$imagePath = "$region-docker.pkg.dev/$projectId/$repoName/$projectName"

# Build and Push using Cloud Build
Write-Host "Building image using Google Cloud Build (this may take a few minutes)..." -ForegroundColor Cyan
& gcloud.cmd builds submit --tag $imagePath

# Get Environment Variables
$mongoUri = $env:MONGODB_URI
if ([string]::IsNullOrEmpty($mongoUri)) {
    $mongoUri = Read-Host "Enter your MONGODB_URI"
}

$jwtSecret = $env:JWT_SECRET
if ([string]::IsNullOrEmpty($jwtSecret)) {
    $jwtSecret = Read-Host "Enter your JWT_SECRET"
}

$stripeKey = $env:STRIPE_SECRET_KEY
if ([string]::IsNullOrEmpty($stripeKey)) {
    $stripeKey = Read-Host "Enter your STRIPE_SECRET_KEY"
}

# Deploy to Cloud Run
Write-Host "Deploying to Google Cloud Run..." -ForegroundColor Cyan
$deployResult = & gcloud.cmd run deploy $projectName `
    --image $imagePath `
    --platform managed `
    --region $region `
    --allow-unauthenticated `
    --env-vars-file deploy-env.yaml

if ($LASTEXITCODE -eq 0) {
    $serviceUrl = & gcloud.cmd run services describe $projectName --platform managed --region $region --format='value(status.url)'
    Write-Host "`n🚀 Deployment successful!" -ForegroundColor Green
    Write-Host "Your app is live at: " -NoNewline
    Write-Host $serviceUrl -ForegroundColor Cyan
} else {
    Write-Host "Deployment failed. Please check the error above." -ForegroundColor Red
}
