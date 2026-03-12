import type { Express } from 'express'
import { createRequire } from 'module'

// Use createRequire for packages that have ES module issues
const require = createRequire(import.meta.url)
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SuccessBridge API',
      version: '1.0.0',
      description: 'Educational Platform API Documentation',
      contact: {
        name: 'SuccessBridge Team',
        email: 'tolesatesfaye273@gmail.com',
      },
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:5000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            email: { type: 'string', format: 'email' },
            name: { type: 'string' },
            role: { type: 'string', enum: ['student', 'admin', 'super_admin'] },
            studentType: { type: 'string', enum: ['high_school', 'university'] },
            highSchoolGrade: { type: 'string' },
            highSchoolStream: { type: 'string' },
            universityLevel: { type: 'string' },
            university: { type: 'string' },
            department: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Resource: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            title: { type: 'string' },
            description: { type: 'string' },
            type: { type: 'string' },
            fileUrl: { type: 'string' },
            educationLevel: { type: 'string', enum: ['high_school', 'university'] },
            grade: { type: 'string' },
            stream: { type: 'string' },
            subjectId: { type: 'string', format: 'uuid' },
            universityId: { type: 'string', format: 'uuid' },
            departmentId: { type: 'string', format: 'uuid' },
            tags: { type: 'array', items: { type: 'string' } },
            uploadedBy: { type: 'string', format: 'uuid' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Quiz: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            title: { type: 'string' },
            description: { type: 'string' },
            subjectId: { type: 'string', format: 'uuid' },
            questions: { type: 'array', items: { type: 'object' } },
            timeLimit: { type: 'integer' },
            passingScore: { type: 'number' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        University: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            location: { type: 'string' },
            email: { type: 'string', format: 'email' },
            phone: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Department: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            universityId: { type: 'string', format: 'uuid' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Subject: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            code: { type: 'string' },
            departmentId: { type: 'string', format: 'uuid' },
            gradeId: { type: 'string', format: 'uuid' },
            streamId: { type: 'string', format: 'uuid' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        ApiResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: { type: 'object' },
            error: { type: 'string' },
            message: { type: 'string' },
          },
        },
        PaginatedResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'object',
              properties: {
                data: { type: 'array', items: { type: 'object' } },
                total: { type: 'integer' },
                page: { type: 'integer' },
                limit: { type: 'integer' },
              },
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            error: { type: 'string' },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Path to the API files
}

const specs = swaggerJsdoc(options)

export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'SuccessBridge API Documentation',
  }))
  
  // JSON endpoint for the OpenAPI spec
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(specs)
  })
}

export default specs