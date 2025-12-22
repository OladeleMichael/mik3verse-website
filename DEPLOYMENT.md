# Deployment Instructions

## AWS S3 Assets Configuration

This project uses AWS S3 to host static assets (images, videos). The S3 bucket URL is configurable via environment variables.

### Environment Variables

Create a `.env.production` file on your server with:

```env
VITE_ASSETS_BASE_URL=https://your-bucket-name.s3.region.amazonaws.com
```

**Default S3 Bucket**: `mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com`

### EC2 Deployment Steps

1. **Clone Repository**
   ```bash
   cd /home/ec2-user
   git clone https://github.com/OladeleMichael/mik3verse-website.git
   cd mik3verse-website
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment** (Optional - uses default if not set)
   ```bash
   echo "VITE_ASSETS_BASE_URL=https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com" > .env.production
   ```

4. **Build Application**
   ```bash
   npm run build
   ```

5. **Serve with PM2**
   ```bash
   npm install -g serve pm2
   sudo pm2 start serve --name mik3verse -- dist -l 80
   pm2 save
   pm2 startup systemd -u ec2-user --hp /home/ec2-user
   ```

### Assets Location

- **Production**: All assets are served from S3 bucket
- **Local Development**: Assets in `public/assets/` (gitignored)
- **S3 Bucket Structure**: `/assets/fitness/`, `/assets/tech/`, `/assets/videography/`, `/assets/shared/`

### Security Notes

- No AWS credentials are stored in code
- S3 bucket URL is configurable via environment variables
- Assets have public read access via bucket policy
- EC2 security group should allow HTTP (80) and HTTPS (443) traffic

### Updating Assets

To update assets in S3:

```bash
aws s3 sync public/assets s3://mik3verse-portfolio-assets/assets/
```

### Repository Size

This repository does NOT include the large media assets (~6.6GB). Only source code is tracked in git, making it lightweight and fast to clone.
