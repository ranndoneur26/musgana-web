#!/bin/bash
echo "🧹 Cleaning up stale Vercel version..."
# Force remove the old version that is stuck
rm -rf node_modules/vercel package-lock.json

echo "⬇️  Installing latest Vercel CLI..."
# Force install the latest version
npm install vercel@latest --save-dev

echo "🔑 Logging in (please follow instructions)..."
# Use the locally installed binary to log in
./node_modules/.bin/vercel login

echo "🚀 Deploying..."
# Deploy using the local binary
./node_modules/.bin/vercel --prod
