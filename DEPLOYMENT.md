
# ZHEN Noodles - Deployment Guide

## Pre-Deployment Checklist

### ✅ Completed
- [x] Security audit passed (0 vulnerabilities)
- [x] All npm packages up-to-date
- [x] Production build configuration
- [x] Docker setup with best practices
- [x] Security headers implemented
- [x] Rate limiting configured
- [x] Product data updated to real values
- [x] All TypeScript errors resolved
- [x] Animated statistics working
- [x] Images optimized

### 🔲 Pre-Launch Tasks
- [ ] Domain name purchased
- [ ] SSL/TLS certificate obtained
- [ ] DNS configured
- [ ] CDN setup (optional but recommended)
- [ ] Monitoring tools configured
- [ ] Backup strategy defined

---

## Deployment Options

### Option 1: Docker Deployment (Recommended)

#### Local Testing
```bash
# Build the image
docker build -t zhen-noodles:latest .

# Run locally
docker run -d -p 3000:3000 --name zhen-test zhen-noodles:latest

# Test
curl http://localhost:3000

# View logs
docker logs zhen-test

# Stop
docker stop zhen-test && docker rm zhen-test
```

#### Production with Docker Compose
```bash
# Start services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f web

# Restart
docker-compose restart

# Stop
docker-compose down
```

#### Behind Nginx Reverse Proxy
```nginx
# /etc/nginx/sites-available/zhen-noodles

server {
    listen 80;
    server_name zhen.com www.zhen.com;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name zhen.com www.zhen.com;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/zhen.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/zhen.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Security headers (additional layer)
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Proxy to Docker container
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Cache static assets
    location /_next/static {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Cache images
    location ~* \.(jpg|jpeg|png|gif|ico|svg|webp)$ {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000";
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/zhen-noodles /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

### Option 2: AWS ECS Deployment

#### Using AWS Fargate

1. **Push image to ECR**
```bash
# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin YOUR_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com

# Build and tag
docker build -t zhen-noodles .
docker tag zhen-noodles:latest YOUR_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/zhen-noodles:latest

# Push
docker push YOUR_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/zhen-noodles:latest
```

2. **Create ECS Task Definition** (`task-definition.json`)
```json
{
  "family": "zhen-noodles",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "containerDefinitions": [
    {
      "name": "zhen-app",
      "image": "YOUR_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/zhen-noodles:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        },
        {
          "name": "NEXT_TELEMETRY_DISABLED",
          "value": "1"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/zhen-noodles",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      },
      "healthCheck": {
        "command": ["CMD-SHELL", "node -e \"require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})\""],
        "interval": 30,
        "timeout": 5,
        "retries": 3,
        "startPeriod": 60
      }
    }
  ]
}
```

3. **Register task definition**
```bash
aws ecs register-task-definition --cli-input-json file://task-definition.json
```

4. **Create ECS Service**
```bash
aws ecs create-service \
  --cluster zhen-cluster \
  --service-name zhen-service \
  --task-definition zhen-noodles \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx],securityGroups=[sg-xxx],assignPublicIp=ENABLED}" \
  --load-balancers targetGroupArn=arn:aws:elasticloadbalancing:...,containerName=zhen-app,containerPort=3000
```

---

### Option 3: Google Cloud Run

```bash
# Build and push to GCR
gcloud builds submit --tag gcr.io/YOUR_PROJECT/zhen-noodles

# Deploy to Cloud Run
gcloud run deploy zhen-noodles \
  --image gcr.io/YOUR_PROJECT/zhen-noodles \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 3000 \
  --memory 512Mi \
  --cpu 1 \
  --max-instances 10 \
  --set-env-vars NODE_ENV=production,NEXT_TELEMETRY_DISABLED=1
```

---

### Option 4: Vercel (Easiest)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Or connect GitHub repo for auto-deploy
```

Configuration (`vercel.json`):
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "NODE_ENV": "production",
    "NEXT_TELEMETRY_DISABLED": "1"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

---

### Option 5: DigitalOcean App Platform

1. **Connect GitHub repository**
2. **App Spec** (`app.yaml`)
```yaml
name: zhen-noodles
services:
  - name: web
    github:
      repo: YOUR_USERNAME/zhen-noodles
      branch: main
      deploy_on_push: true
    dockerfile_path: Dockerfile
    http_port: 3000
    instance_count: 2
    instance_size_slug: basic-xxs
    health_check:
      http_path: /
      initial_delay_seconds: 30
      period_seconds: 10
      timeout_seconds: 3
      success_threshold: 1
      failure_threshold: 3
    envs:
      - key: NODE_ENV
        value: production
      - key: NEXT_TELEMETRY_DISABLED
        value: "1"
    routes:
      - path: /
```

3. **Deploy**
```bash
doctl apps create --spec app.yaml
```

---

## Post-Deployment

### 1. SSL/TLS Setup (Let's Encrypt)

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d zhen.com -d www.zhen.com

# Auto-renewal
sudo certbot renew --dry-run
```

### 2. CDN Setup (Cloudflare)

1. Sign up at cloudflare.com
2. Add your domain
3. Update nameservers
4. Enable settings:
   - Auto Minify (JS, CSS, HTML)
   - Brotli compression
   - Rocket Loader
   - HTTP/3 (with QUIC)
   - Always Use HTTPS
   - Automatic HTTPS Rewrites

### 3. Monitoring Setup

#### Using Uptime Robot (Free)
1. Sign up at uptimerobot.com
2. Add monitor:
   - Type: HTTPS
   - URL: https://zhen.com
   - Interval: 5 minutes
   - Alert contacts: your email

#### Using Better Stack (Recommended)
```bash
# Install agent
curl -sSL https://get.betterstack.com | bash

# Configure
betterstack-agent configure --token YOUR_TOKEN
```

### 4. Analytics Setup

#### Google Analytics 4
```typescript
// Add to app/layout.tsx
<script
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
  strategy="afterInteractive"
/>
<script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</script>
```

### 5. Error Tracking

#### Sentry
```bash
npm install @sentry/nextjs

# Run setup
npx @sentry/wizard@latest -i nextjs
```

---

## Maintenance

### Regular Updates
```bash
# Weekly
npm outdated
npm update
npm audit

# Monthly
npm audit fix
docker pull node:20-alpine
docker build -t zhen-noodles:latest .
```

### Backup Strategy
```bash
# Automated daily backup script
#!/bin/bash
DATE=$(date +%Y%m%d)
docker save zhen-noodles:latest | gzip > /backups/zhen-noodles-$DATE.tar.gz
find /backups -name "zhen-noodles-*.tar.gz" -mtime +30 -delete
```

### Logs Management
```bash
# View logs
docker-compose logs -f --tail=100

# Export logs
docker-compose logs --no-color > logs-$(date +%Y%m%d).txt

# Rotate logs (add to crontab)
0 0 * * * docker-compose logs --no-color > /var/log/zhen/app-$(date +\%Y\%m\%d).log
```

---

## Troubleshooting

### Container Won't Start
```bash
# Check logs
docker logs zhen-app

# Check health
docker inspect --format='{{.State.Health.Status}}' zhen-app

# Check ports
netstat -tulpn | grep 3000
```

### High Memory Usage
```bash
# Check resource usage
docker stats zhen-app

# Restart container
docker-compose restart web
```

### SSL Certificate Issues
```bash
# Test certificate
openssl s_client -connect zhen.com:443 -servername zhen.com

# Renew if expired
sudo certbot renew --force-renewal
```

---

## Security Maintenance

### Monthly Tasks
- [ ] Run `npm audit`
- [ ] Check for outdated packages
- [ ] Review access logs for suspicious activity
- [ ] Test backup restoration
- [ ] Verify SSL certificate expiry (>30 days)

### Quarterly Tasks
- [ ] Review and update security headers
- [ ] Penetration testing
- [ ] Update base Docker image
- [ ] Review rate limiting effectiveness
- [ ] Audit user access

---

## Performance Optimization

### Enable Caching
```nginx
# Add to nginx config
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=zhen_cache:10m max_size=1g inactive=60m;

location / {
    proxy_cache zhen_cache;
    proxy_cache_valid 200 60m;
    proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504;
}
```

### CDN Configuration
```javascript
// next.config.ts
images: {
  domains: ['cdn.zhen.com'],
  loader: 'custom',
  loaderFile: './image-loader.ts'
}
```

---

## Support

**For deployment issues:**
- Check [SECURITY_AUDIT.md](./SECURITY_AUDIT.md)
- Review [README.md](./README.md)
- Contact: info@zhen.com

**Emergency Rollback:**
```bash
# Docker
docker-compose down
docker-compose up -d

# Or restore from backup
docker load < /backups/zhen-noodles-YYYYMMDD.tar.gz
docker-compose up -d
```

---

**Last Updated:** February 26, 2026
