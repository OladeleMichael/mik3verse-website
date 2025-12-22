#!/bin/bash
# EC2 User Data Script for Mik3verse Portfolio Website
# This script automatically sets up the application on instance launch/reboot

# Update system packages
sudo yum update -y

# Install AWS CLI v2 (if not already installed)
if ! command -v aws &> /dev/null; then
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
    unzip awscliv2.zip
    sudo ./aws/install
    rm -rf aws awscliv2.zip
fi

# Install Node.js 18.x (required for the application)
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Install Git
sudo yum install -y git

# Install PM2 and serve globally
sudo npm install -g pm2 serve

# Set up application directory
APP_DIR="/home/ec2-user/mik3verse-website"
cd /home/ec2-user

# Clone the repository (or pull if it exists)
if [ -d "$APP_DIR" ]; then
    cd "$APP_DIR"
    sudo -u ec2-user git pull origin clean-branch
else
    sudo -u ec2-user git clone -b clean-branch https://github.com/OladeleMichael/mik3verse-website.git
    cd "$APP_DIR"
fi

# Get AWS region from instance metadata
REGION=$(curl -s http://169.254.169.254/latest/meta-data/placement/region)

# Fetch S3 bucket URL from AWS Systems Manager Parameter Store
S3_BUCKET_URL=$(aws ssm get-parameter --name "/mik3verse/s3-assets-url" --query "Parameter.Value" --output text --region $REGION 2>/dev/null)

# Fallback: If parameter doesn't exist, use default value
if [ -z "$S3_BUCKET_URL" ]; then
    S3_BUCKET_URL="https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com"
    echo "Warning: Could not fetch S3 URL from Parameter Store. Using default value."
fi

# Create .env.production file with fetched S3 bucket URL
cat > .env.production << EOF
VITE_ASSETS_BASE_URL=$S3_BUCKET_URL
EOF

# Set proper ownership
chown ec2-user:ec2-user .env.production

# Install dependencies
sudo -u ec2-user npm install

# Build the application
sudo -u ec2-user npm run build

# Stop existing PM2 processes
sudo -u ec2-user pm2 delete all || true

# Start the application with PM2 on port 3000
sudo -u ec2-user pm2 start "serve -s dist -l 3000" --name mik3verse-website

# Save PM2 process list
sudo -u ec2-user pm2 save

# Setup PM2 to start on system boot
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u ec2-user --hp /home/ec2-user

# Enable PM2 startup
sudo systemctl enable pm2-ec2-user

echo "Mik3verse Portfolio Website setup complete!"
echo "Application is running on port 3000"
echo "Access it at: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):3000"
