# Makefile for Next.js project

# Variables
YARN := yarn

# Phony targets
.PHONY: help lint format build

# Default target
help:
	@echo "Available commands:"
	@echo "  make lint     - Run ESLint and automatically fix issues"
	@echo "  make format   - Fix formatting issues with Prettier"

# Lint commands
lint:
	@echo "Running ESLint and fixing issues..."
	@$(YARN) lint:fix

# Format commands
format:
	@echo "Fixing formatting issues with Prettier..."
	@$(YARN) format:fix

# Build commands
build:
	@echo "Build product"
	@$(YARN) build

# Build, Lint and Format commands
fix:
	@echo "Running ESLint fix and Prettier fix and build..."
	$(MAKE) build
	$(MAKE) lint
	$(MAKE) format
	@echo "All fixes completed!"