#!/bin/bash
# This script configures and sets up databases and migrations for different workspaces

# Configure server workspace
npm run config -w=server

# Configure client workspace
npm run config -w=client

# Setup database for server workspace
npm run setup-db -w=server

# Run migrations for server workspace
npm run migrate -w=server
npm run migrate:dev -w=server
npm run migrate:test -w=server

# Seed the test database
npm run seed:test -w=server
