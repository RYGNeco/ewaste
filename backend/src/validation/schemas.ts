// API Validation Schema Example
import Joi from 'joi';

export const userSchemas = {
  createUser: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    userType: Joi.string().valid('employee', 'partner', 'super_admin').required(),
    firstName: Joi.string().min(1).max(50),
    lastName: Joi.string().min(1).max(50),
    requestedRoles: Joi.array().items(
      Joi.string().valid('admin', 'inventory_manager', 'transporter', 'coordinator')
    )
  }),

  updateUser: Joi.object({
    name: Joi.string().min(2).max(100),
    firstName: Joi.string().min(1).max(50),
    lastName: Joi.string().min(1).max(50),
    role: Joi.string().valid('super_admin', 'admin', 'inventory_manager', 'transporter', 'coordinator', 'partner')
  }),

  queryUsers: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    userType: Joi.string().valid('employee', 'partner', 'super_admin'),
    roleApprovalStatus: Joi.string().valid('pending', 'approved', 'rejected'),
    status: Joi.string().valid('active', 'inactive', 'pending')
  })
};

export const partnerSchemas = {
  createPartner: Joi.object({
    organizationName: Joi.string().min(2).max(200).required(),
    contactPerson: Joi.object({
      firstName: Joi.string().min(1).max(50).required(),
      lastName: Joi.string().min(1).max(50).required(),
      email: Joi.string().email().required(),
<<<<<<< HEAD
      phone: Joi.string().pattern(/^[\+]?[1-9][\d]{0,15}$/).required()
=======
      phone: Joi.string().pattern(/^[+]?[1-9][\d]{0,15}$/).required()
>>>>>>> c1d976faeace438720baff3c129c4dea43581e86
    }).required(),
    address: Joi.object({
      street: Joi.string().min(5).max(200).required(),
      city: Joi.string().min(2).max(100).required(),
      state: Joi.string().min(2).max(100).required(),
      zipCode: Joi.string().pattern(/^\d{5}(-\d{4})?$/).required(),
      country: Joi.string().min(2).max(100).default('United States')
    }).required(),
    businessInfo: Joi.object({
      businessType: Joi.string().min(2).max(100).required(),
      industry: Joi.string().min(2).max(100).required(),
      employeeCount: Joi.number().integer().min(1).required(),
      website: Joi.string().uri().allow('')
    }).required()
  })
};

export const roleRequestSchemas = {
  approve: Joi.object({
    approvedRoles: Joi.array().items(
      Joi.string().valid('admin', 'inventory_manager', 'transporter', 'coordinator')
    ).min(1).required()
  }),

  reject: Joi.object({
    rejectionReason: Joi.string().min(10).max(500).required()
  })
};
