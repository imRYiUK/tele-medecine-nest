#!/bin/bash

echo "Testing Orthanc connections..."
echo "=============================="

# Test orthanc1 (port 8041)
echo "Testing orthanc1 on port 8041..."
if curl -s -u orthanc:orthanc http://localhost:8041/system > /dev/null 2>&1; then
    echo "✅ orthanc1 is accessible on port 8041"
else
    echo "❌ orthanc1 is NOT accessible on port 8041"
fi

# Test orthanc2 (port 8044)
echo "Testing orthanc2 on port 8044..."
if curl -s -u orthanc:orthanc http://localhost:8044/system > /dev/null 2>&1; then
    echo "✅ orthanc2 is accessible on port 8044"
else
    echo "❌ orthanc2 is NOT accessible on port 8044"
fi

# Test orthanc3 (port 8045)
echo "Testing orthanc3 on port 8045..."
if curl -s -u orthanc:orthanc http://localhost:8045/system > /dev/null 2>&1; then
    echo "✅ orthanc3 is accessible on port 8045"
else
    echo "❌ orthanc3 is NOT accessible on port 8045"
fi

echo ""
echo "Checking container status..."
docker ps --filter "name=orthanc" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" 