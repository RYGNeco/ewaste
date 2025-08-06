#!/bin/bash
echo "Testing TypeScript compilation..."
cd backend
npx tsc --noEmit
echo "TypeScript compilation test completed."
