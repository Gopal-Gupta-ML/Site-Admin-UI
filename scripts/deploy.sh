#!/bin/bash
set -e  # exit immediately if a command fails

# Configure Docker to use Minikube's Docker daemon
eval $(minikube docker-env)

# Build Docker image
echo "Building Docker image..."
docker build -t admin-ui:latest .

# Uninstall existing Helm release if exists
echo "Uninstalling existing Helm release (if any)..."
helm uninstall admin-ui || true

# Install Helm chart
echo "Installing Helm release..."
helm install admin-ui ./helm/admin-ui

