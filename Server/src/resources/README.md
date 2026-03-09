# Resources Module

Unified resource management system for all content types.

## Resource Types
- Textbook
- Video
- Past Exam
- Module
- Quiz
- Worksheet
- Project
- Research
- Career Guide

## Unified Resource Table
Instead of separate tables for each type, uses single `resources` table with flexible schema.

## Responsibilities
- Upload resources
- Manage resource metadata
- Filter resources by type, subject, level
- Handle file storage (S3/Cloudflare R2)
- Resource approval workflow
- Tag management

## Files Structure
- `upload.js` - Resource upload handler
- `filter.js` - Advanced filtering logic
- `storage.js` - File storage integration
- `approval.js` - Resource approval workflow
- `metadata.js` - Resource metadata management
