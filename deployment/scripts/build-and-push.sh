#!/bin/bash
set -e

# build-and-push.sh - Build and push skill-repeater-front to Docker Hub
# Usage: ./build-and-push.sh <version>
# Run from skill-repeater-front root.

SERVICE_NAME="skill-repeater-front"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SERVICE_DEPLOYMENT="$(dirname "$(dirname "$SCRIPT_DIR")")"
SERVICE_ROOT="$(dirname "$SERVICE_DEPLOYMENT")"

if [ -z "$DOCKERHUB_USERNAME" ] || [ -z "$DOCKERHUB_TOKEN" ]; then
  echo "Error: DOCKERHUB_USERNAME and DOCKERHUB_TOKEN are required" >&2
  exit 1
fi
if [ $# -lt 1 ]; then
  echo "Usage: $0 <version>" >&2
  exit 1
fi
VERSION=$1
TAG_DATE=$(date +%Y%m%d%H%M%S)

echo "🚀 Building and pushing $SERVICE_NAME (version: $VERSION)..."
docker buildx build --platform linux/arm64 \
  --build-arg VITE_API_URL=https://api.posadskiy.com/skill-repeater \
  --build-arg VITE_AUTH_URL=https://api.posadskiy.com/auth \
  --build-arg VITE_USER_URL=https://api.posadskiy.com/user \
  -f "$SERVICE_ROOT/Dockerfile.prod" \
  -t "$DOCKERHUB_USERNAME/$SERVICE_NAME:$VERSION" \
  -t "$DOCKERHUB_USERNAME/$SERVICE_NAME:$TAG_DATE" \
  -t "$DOCKERHUB_USERNAME/$SERVICE_NAME:latest" \
  "$SERVICE_ROOT/" --push

echo "✅ $SERVICE_NAME image built and pushed successfully!"
